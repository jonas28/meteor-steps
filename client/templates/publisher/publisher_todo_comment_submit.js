var EDITING_KEY = 'EDITING_TODO_ID';

Template.publisherTodoCommentSubmit.helpers({
    editingClass: function() {
        return Session.equals(EDITING_KEY, this._id) && 'editing';
    }
});

Template.publisherTodoCommentSubmit.events({
    'focus textarea': function(event) {
        Session.set(EDITING_KEY, this._id);
    },

    'blur textarea': function(event) {
        if (Session.equals(EDITING_KEY, this._id))
            Session.set(EDITING_KEY, null);
    },

    'keydown textarea': function(event) {
        // ESC or ENTER
        if (event.which === 27 || event.which === 13) {
            event.preventDefault();
            event.target.blur();
        }
    },

    // update the text of the item on keypress but throttle the event to ensure
    // we don't flood the server with updates (handles the event at most once
    // every 300ms)
    'keyup textarea': _.throttle(function(event) {
        Todos.update(this._id, {$set: {comment: event.target.value}});
    }, 300)
});