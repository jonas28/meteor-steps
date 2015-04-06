Template.publisher.helpers({
    lists: function() {
        var userId = Meteor.userId();
        return Lists.find({"maintainers.userId" : userId});
    }
});