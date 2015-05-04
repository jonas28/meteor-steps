Template.addMaintainer.helpers({
    users: function() {
        return Users.find();
    }
});


Template.addMaintainer.rendered = function () {
    this.$('.dropdown')
        .dropdown({
            // you can use any ui transition
            transition: 'drop'
        })
    ;
};

Template.addMaintainer.events({
    'click .item': function(e) {
        e.preventDefault();
        var currentListId = Template.parentData(1)._id;
        alert(currentListId);
        var selectedUserId = $(e.currentTarget).data('value');
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
                // alert('Und alle so yeaahh!');
                // Router.go('listPage', {_id: currentListId});
            }
        });
    }
});