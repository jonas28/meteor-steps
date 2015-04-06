Template.listEdit.events({
    'submit form': function(e) {
        e.preventDefault();

        var currentListId = this._id;

        var listProperties = {
            title: $(e.target).find('[name=title]').val(),
            description: $(e.target).find('[name=description]').val()
        };

        var user = Meteor.user();

        Lists.update(currentListId, {$set: listProperties, $inc: {shares: 1}, $push: { activities: {userId: user._id, userName: user.username, activity: 'update', date: new Date()}}}, function(error) {
            if (error) {
                // display the error to the user
                throwError(error.reason);
            } else {
                Router.go('listPage', {_id: currentListId});
            }
        });

    },
    'click .delete': function(e) {
        e.preventDefault();

        if (confirm("Delete this list?")) {
            var currentListId = this._id;
            Lists.remove(currentListId);
            Router.go('listsList');
        }
    }
});