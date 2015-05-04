var EDITING_KEY = 'EDITING_TODO_ID';

Template.publisherTodoItem.helpers({
    editingClass: function() {
        return Session.equals(EDITING_KEY, this._id) && 'editing';
    },
    isPublished: function() {
        return this.status == 'published';
    },
    isPullrequest: function() {
        return this.status == 'pullrequest';
    }
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
        var user = Meteor.user()
        Todos.update(this._id, {$set: {title: event.target.value}, $inc: {shares: 1}, $push: { activities: {userId: user._id, userName: user.username, activity: 'update', date: new Date()}}});
        var currentListId = this.listId;
        Lists.update(currentListId, {$inc: {shares: 1}, $push: { activities: {userId: user._id, userName: user.username, activity: 'update', date: new Date()}}});
        // TODO #48: da scheinbar alle 300ms gesaved wird, werden mehrere Updates des Todos und der Liste durchgeführt.
    }, 300),
    'click .delete': function(e) {
        e.preventDefault();

        if (confirm("Delete this todo?")) {
            var currentTodoId = this._id;
            Todos.remove(currentTodoId);
            // TODO #49: Wenn Todos gelöscht werden müssen vor der Löschung die entsprechenden Shares in der Liste gelöscht werden.
        }
    },
    'click .publish': function(e) {
        e.preventDefault();
        Todos.update(this._id, {$set: {status: 'published'}});
    },
    'click .unpublish': function(e) {
        e.preventDefault();
        Todos.update(this._id, {$set: {status: 'draft'}});
    }
});