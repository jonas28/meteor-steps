Accounts.oauth.registerService('wunderlist');

if (Meteor.isClient) {
    Meteor.loginWithWunderlist = function(options, callback) {
        // support a callback without options
        if (! callback && typeof options === "function") {
            callback = options;
            options = null;
        }

        var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
        console.log('button geclicked');
        Wunderlist.requestCredential(options, credentialRequestCompleteCallback);
    };
} else {
    Accounts.addAutopublishFields({
        forLoggedInUser: ['services.wunderlist'],
        forOtherUsers: ['services.wunderlist.username']
    });
}