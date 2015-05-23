Trello = {};

OAuth.registerService('trello', 2, null, function(query) {

    var accessToken = getAccessToken(query);
    var identity = getIdentity(accessToken);

    return {
        serviceData: {
            id: identity.id,
            accessToken: OAuth.sealSecret(accessToken),
            email: identity.email,
            username: identity.fullName
        },
        options: {profile: {name: identity.fullName}}
    };
});

var userAgent = "Meteor";
if (Meteor.release)
    userAgent += "/" + Meteor.release;

var getAccessToken = function (query) {
    var config = ServiceConfiguration.configurations.findOne({service: 'trello'});
    if (!config)
        throw new ServiceConfiguration.ConfigError();

    var response;

    try {
        response = HTTP.post(
            "https://trello.com/1/OAuthGetAccessToken", {
                headers: {
                    Accept: 'application/json',
                    "User-Agent": userAgent
                },
                params: {
                    client_key: config.clientKey,
                    client_secret: OAuth.openSecret(config.secret),
                    code: query.code
                }
            });
    } catch (err) {
        throw _.extend(new Error("Failed to complete OAuth handshake with Trello. " + err.message),
            {response: err.response});
    }
    if (response.data.error) { // if the http response was a json object with an error attribute
        throw new Error("Failed to complete OAuth handshake with Wunderlist. " + response.data.error);
    } else {
        return response.data.access_token;
    }
};

var getIdentity = function (accessToken) {
    var config = ServiceConfiguration.configurations.findOne({service: 'trello'});
    try {
        return HTTP.get(
            "https://api.trello.com/1/members/me", {
                headers: {
                    "User-Agent": userAgent,
                    "X-Access-Token": accessToken,
                    "X-Client-ID": config.clientKey
                }
            }).data;
    } catch (err) {
        throw _.extend(new Error("Failed to fetch identity from Trello. " + err.message),
            {response: err.response});
    }
};


Trello.retrieveCredential = function(credentialToken, credentialSecret) {
    return OAuth.retrieveCredential(credentialToken, credentialSecret);
};