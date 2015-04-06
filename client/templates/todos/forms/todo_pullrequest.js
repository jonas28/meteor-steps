Template.todoPullrequest.events({
    'submit form': function(e) {
        e.preventDefault();

        var pullrequest = {
            title: $(e.target).find('[name=title]').val(),
            comment: $(e.target).find('[name=comment]').val(),
            listId: this.listId,
            todoId: this._id,
            status: 'pullrequest'
        };


        Meteor.call('todoInsert', pullrequest, function(error, result) {
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