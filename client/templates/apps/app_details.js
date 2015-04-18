Template.appDetails.helpers({
    wunderlist_client_id: function() {
        return Meteor.settings.public.wunderlist.wunderlist_client_id;
    }
});

Template.appDetails.events({
    'click .oauth': function(e) {
        e.preventDefault();
        var client_id = Meteor.settings.public.wunderlist.wunderlist_client_id;
        var redirect_url = Meteor.settings.public.wunderlist.wunderlist_redirect_url;
        var wunderlist_url = "https://www.wunderlist.com/oauth/authorize?client_id=" + client_id + "&redirect_uri=" + redirect_url + "&state=RANDOM";
        window.location.href = wunderlist_url;
    }
});

