Template.publisherListSubmit.events({
    'submit form': function(e) {
        e.preventDefault();

        var list = {
            title: $(e.target).find('[name=title]').val()
        };
        Meteor.call('listInsert', list, function(error, result) {
            Router.go('publisherListPage', {_id: result._id});
        });
    }
});