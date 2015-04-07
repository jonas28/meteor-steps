Template.addMaintainer.helpers({
    users: function() {
        return Users.find();
    }
});

Template.listDetailsMaintainers.events({
    'submit form': function(e) {
        e.preventDefault();

        var currentListId = this._id;
        var selectedUserId = $(e.target).find('[name=userid]').val();
        var newmaintainer = Users.findOne({_id : selectedUserId});

        var listProperties = {
            userId: selectedUserId,
            userName: newmaintainer.username
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