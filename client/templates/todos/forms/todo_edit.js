Template.todoEdit.events({
    'submit form': function(e) {
        e.preventDefault();

        var currentTodoId = this._id;

        var todoProperties = {
            title: $(e.target).find('[name=title]').val(),
            comment: $(e.target).find('[name=comment]').val(),
            listId: $(e.target).find('[name=listId]').val()
        }

        var listId = this.listId;

        Lists.update(listId, {$inc: {shares: 1}}, function(error) {
            if (error) {
                // display the error to the user
                throwError(error.reason);
            }
        });

        var user = Meteor.user();

        Todos.update(currentTodoId, {$set: todoProperties, $inc: {shares: 1}, $push: { activities: {userId: user._id, userName: user.username, activity: 'update', date: new Date()}}},  function(error) {
            if (error) {
                // display the error to the user
                throwError(error.reason);
            } else {
                Router.go('todoPage', {_id: currentTodoId});
            }
        });
        Lists.update(currentListId, {$inc: {shares: 1}, $push: { activities: {userId: user._id, userName: user.username, activity: 'update', date: new Date()}}});
        // TODO: Check why there are 2 List.updates in this file
    },

    'click .delete': function(e) {
        e.preventDefault();

        if (confirm("Delete this todo?")) {
            var currentTodoId = this._id;
            Todos.remove(currentTodoId);
            Router.go('postsList');
        }
    }
});