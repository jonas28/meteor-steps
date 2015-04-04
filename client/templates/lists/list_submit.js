Template.listSubmit.events({
    'submit form': function(e) {
        e.preventDefault();

        var list = {
            title: $(e.target).find('[name=title]').val(),
            description: $(e.target).find('[name=description]').val()
        };


        Meteor.call('listInsert', list, function(error, result) {
            // display the error to the user and abort
            if (error)
                return throwError(error.reason);

            // show this result but route anyway
            if (result.listExists)
                throwError('This list has already been posted');

            Router.go('listPage', {_id: result._id});
        });
    }
});