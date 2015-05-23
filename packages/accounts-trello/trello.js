Accounts.oauth.registerService('trello');

if (Meteor.isClient) {
    Meteor.loginWithTrello = function(options, callback) {
        // support a callback without options
        if (! callback && typeof options === "function") {
            callback = options;
            options = null;
        }

        var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
        Trello.requestCredential(options, credentialRequestCompleteCallback);
    };
} else {
    Accounts.addAutopublishFields({
        forLoggedInUser: ['services.trello'],
        forOtherUsers: ['services.trello.username']
    });
}