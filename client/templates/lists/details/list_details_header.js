Template.listDetailsHeader.helpers({
    maintainer: function() {
        var userId = Meteor.userId();
        return _.contains(_.pluck(this.maintainers, 'userId'), userId);
    }
});

Template.listDetailsHeader.events({
    'click .postlist': function(e) {
        e.preventDefault();
        var listId = this._id;
        return Wunderlist.postList(listId);
    }
});