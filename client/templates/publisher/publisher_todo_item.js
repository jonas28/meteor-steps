var EDITING_KEY = 'EDITING_TODO_ID';

Template.publisherTodoItem.helpers({
    editingClass: function() {
        return Session.equals(EDITING_KEY, this._id) && 'editing';
    },
    isPublished: function() {
        return this.status == 'published';
    },

});

Template.publisherTodoItem.events({
    'focus input[type=text]': function(event) {
        Session.set(EDITING_KEY, this._id);
    },

    'blur input[type=text]': function(event) {
        if (Session.equals(EDITING_KEY, this._id))
            Session.set(EDITING_KEY, null);
    },

    'keydown input[type=text]': function(event) {
        // ESC or ENTER
        if (event.which === 27 || event.which === 13) {
            event.preventDefault();
            event.target.blur();
        }
    },

    // update the text of the item on keypress but throttle the event to ensure
    // we don't flood the server with updates (handles the event at most once
    // every 300ms)
    'keyup input[type=text]': _.throttle(function(event) {
        Todos.update(this._id, {$set: {title: event.target.value}});
    }, 300),
    'click .delete': function(e) {
        e.preventDefault();

        if (confirm("Delete this todo?")) {
            var currentTodoId = this._id;
            Todos.remove(currentTodoId);
        }
    },
    'click .publish': function(e) {
        e.preventDefault();

        if (confirm("Publish this todo?")) {
            Todos.update(this._id, {$set: {status: 'published'}});
        }
    },
    'click .unpublish': function(e) {
        e.preventDefault();

        if (confirm("Unpublish this todo?")) {
            Todos.update(this._id, {$set: {status: 'draft'}});
        }
    }

});