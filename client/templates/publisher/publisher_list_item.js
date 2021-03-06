var EDITING_KEY = 'EDITING_TODO_ID';

Template.publisherListItem.helpers({
    editingClass: function() {
        return Session.equals(EDITING_KEY, this._id) && 'editing';
    }
});

Template.publisherListItem.events({
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
        Lists.update(this._id, {$set: {title: event.target.value}, $inc: {shares: 1}, $push: { activities: {userId: user._id, userName: user.username, activity: 'update', date: new Date()}}});
    }, 300),
});