Template.listSubmit.events({
    'submit form': function(e) {
        e.preventDefault();

        var list = {
            title: $(e.target).find('[name=title]').val(),
            teaser: $(e.target).find('[name=teaser]').val(),
            description: $(e.target).find('[name=description]').val(),
            status: $(e.target).find('[name=status]').val()
        };


        Meteor.call('listInsert', list, function(error, result) {
            Router.go('listPage', {_id: result._id});
        });
    }
});