Template.listDetailsForks.helpers({
    forks: function() {
        return Lists.find({original : this._id});
    }
});

Template.listDetailsForks.events({
    'click .fork': function(e) {
        e.preventDefault();

        var originalActivies = this.activities;
        var user = Meteor.user();
        var forked = [{userId: user._id, userName: user.username, activity: 'forked', date: new Date()}];

        var newActivities = this.activities.concat(forked);

        var list = {
            title :  this.title + " (fork)",
            description: this.description,
            original : this._id,
            activities: newActivities,
            shares: this.shares
        };

        var originalListId =  this._id;

        Meteor.call('listFork', list, function(error, result) {
            // display the error to the user and abort
            if (error)
                return throwError(error.reason);

            // show this result but route anyway
            if (result.listExists)
                throwError('This list has already been posted');

            var newListId = result._id;

            Router.go('listEdit', {_id: result._id});

            var originalTodos = Todos.find({listId : originalListId});

            originalTodos.forEach(function (todo) {

                var newTodo = {
                    title :  todo.title + " (fork)",
                    comment: todo.comment,
                    listId: newListId,
                    activities: todo.activities,
                    shares: todo.shares,
                    date: todo.date,
                };

                Meteor.call('todoFork', newTodo, function(error, result) {

                    // display the error to the user and abort
                    if (error)
                        return throwError(error.reason);

                    // show this result but route anyway
                    if (result.listExists)
                        throwError('This todo has already been posted');

                });

            });
        });
    }
});