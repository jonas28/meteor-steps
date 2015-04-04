Template.todoDetails.helpers({
    maintainer: function() {
        return this.maintainers[0].userId === Meteor.userId();
    }
});