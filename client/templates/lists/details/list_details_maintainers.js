Template.listDetailsMaintainers.helpers({
    maintainer: function() {
        var userId = Meteor.userId();
        return _.contains(_.pluck(this.maintainers, 'userId'), userId);
    }
});

