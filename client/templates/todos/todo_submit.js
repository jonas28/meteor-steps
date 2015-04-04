Template.todoSubmit.events({
    'submit form': function(e) {
        e.preventDefault();

        var todo = {
            title: $(e.target).find('[name=title]').val(),
            comment: $(e.target).find('[name=comment]').val(),
            listId: $(e.target).find('[name=listId]').val()
        };


        Meteor.call('todoInsert', todo, function(error, result) {
            // display the error to the user and abort
            if (error)
                return throwError(error.reason);

            // show this result but route anyway
            if (result.listExists)
                throwError('This todo has already been posted');

            Router.go('todoPage', {_id: result._id});
        });
    }
});