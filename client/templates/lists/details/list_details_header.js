Template.listDetailsHeader.helpers({
    maintainer: function() {
        var userId = Meteor.userId();
        return _.contains(_.pluck(this.maintainers, 'userId'), userId);
    },
    apps: function() {
        return Apps.find();
    }
});

Template.listDetailsHeader.events({
    'click .exportToWunderlist': function(e) {
        e.preventDefault();
        var listId = this._id;
        return Wunderlist.postList(listId);
    },
    'click .exportToEvernote': function(e) {
        e.preventDefault();
        alert('coming soon!');
    }
});