Template.appDetails.helpers({

});

Template.appDetails.events({
    'click .postlist': function(e) {
        e.preventDefault();
        return Wunderlist.postList();
    }
});

