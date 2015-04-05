Template.todoDetails.helpers({
    maintainer: function() {
        var userId = Meteor.userId();
        var list = Lists.findOne(this.listId);
        return _.contains(_.pluck(list.maintainers, 'userId'), userId);
    }
});