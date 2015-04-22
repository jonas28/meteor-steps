Template.listDetailsHeader.helpers({
    maintainer: function() {
        var userId = Meteor.userId();
        return _.contains(_.pluck(this.maintainers, 'userId'), userId);
    }
});

Template.listDetailsHeader.events({
    'click .exportWunderlist': function(e) {
        e.preventDefault();
        var listId = this._id;
        return Wunderlist.postList(listId);
    }
});