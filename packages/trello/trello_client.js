Trello = {};

// Request Trello credentials for the user
// @param options {optional}
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.


Trello.requestCredential = function (options, credentialRequestCompleteCallback) {
    // support both (options, callback) and (callback).
    if (!credentialRequestCompleteCallback && typeof options === 'function') {
        credentialRequestCompleteCallback = options;
        options = {};
    }

    var config = ServiceConfiguration.configurations.findOne({service: 'trello'});
    if (!config) {
        credentialRequestCompleteCallback && credentialRequestCompleteCallback(
            new ServiceConfiguration.ConfigError());
        return;
    }
    var credentialToken = Random.secret();

    var loginStyle = OAuth._loginStyle('trello', config, options);

    var loginUrl =
        'https://trello.com/1/authorize' +
        '?key=' + config.clientKey +
        '&name=steps' +
        '&expiration=30days' +
        '&response_type=token' +
        '&redirect_uri=' + config.redirectUrl +
        '&state=' + OAuth._stateParam(loginStyle, credentialToken);



    OAuth.launchLogin({
        loginService: "trello",
        loginStyle: loginStyle,
        loginUrl: loginUrl,
        credentialRequestCompleteCallback: credentialRequestCompleteCallback,
        credentialToken: credentialToken,
        popupOptions: {width: 900, height: 450}
    });
};

