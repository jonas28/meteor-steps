Template.publisherListInsightsPage.helpers({
    lists: function() {
        var userId = Meteor.userId();
        return Lists.find({"maintainers.userId" : userId});
    }
});