Template.listDetailsMaintainers.helpers({
    maintainer: function() {
        var userId = Meteor.userId();
        return _.contains(_.pluck(this.maintainers, 'userId'), userId);
    }
});

Template.listDetailsMaintainers.events({
    'submit form': function(e) {
        e.preventDefault();

        var currentListId = this._id;

        var listProperties = {
            userId: $(e.target).find('[name=userid]').val(),
            userName: $(e.target).find('[name=username]').val()
        };

        Lists.update(currentListId, {$push: { maintainers: listProperties }}, function(error) {
            if (error) {
                // display the error to the user
                throwError(error.reason);
            } else {
                Router.go('listPage', {_id: currentListId});mete
            }
        });

    }
});