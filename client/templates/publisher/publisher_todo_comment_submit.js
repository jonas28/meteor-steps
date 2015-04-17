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
        var user = Meteor.user()
        Todos.update(this._id, {$set: {comment: event.target.value}, $inc: {shares: 1}, $push: { activities: {userId: user._id, userName: user.username, activity: 'update', date: new Date()}}});
        var currentListId = this.listId;
        Lists.update(currentListId, {$inc: {shares: 1}, $push: { activities: {userId: user._id, userName: user.username, activity: 'update', date: new Date()}}});
        // TODO #48: da scheinbar alle 300ms gesaved wird, werden mehrere Updates des Todos und der Liste durchgeführt.
    }, 300)
});

// TODO 47: Aufgaben, die aus diesem Template angelegt werden, werden nicht der Liste zugeordet.