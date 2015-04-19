Github = {};

OAuth.registerService('wunderlist', 2, null, function(query) {

    var accessToken = getAccessToken(query);
    var identity = getIdentity(accessToken);

    return {
        serviceData: {
            id: identity.id,
            accessToken: OAuth.sealSecret(accessToken),
            email: identity.email,
            username: identity.name
        },
        options: {profile: {name: identity.name}}
    };
});

var userAgent = "Meteor";
if (Meteor.release)
    userAgent += "/" + Meteor.release;

var getAccessToken = function (query) {
    var config = ServiceConfiguration.configurations.findOne({service: 'wunderlist'});
    if (!config)
        throw new ServiceConfiguration.ConfigError();

    var response;
    try {
        response = HTTP.post(
            "https://www.wunderlist.com/oauth/access_token", {
                headers: {
                    Accept: 'application/json',
                    "User-Agent": userAgent
                },
                params: {
                    code: query.code,
                    client_id: config.clientId,
                    client_secret: OAuth.openSecret(config.secret),
                    redirect_uri: OAuth._redirectUri('wunderlist', config),
                    state: query.state
                }
            });
    } catch (err) {
        throw _.extend(new Error("Failed to complete OAuth handshake with Wunderlist. " + err.message),
            {response: err.response});
    }
    if (response.data.error) { // if the http response was a json object with an error attribute
        throw new Error("Failed to complete OAuth handshake with Wunderlist. " + response.data.error);
    } else {
        return response.data.access_token;
    }
};

var getIdentity = function (accessToken) {
    try {
        return HTTP.get(
            "a.wunderlist.com/api/v1/user", {
                headers: {"User-Agent": userAgent},
                params: {access_token: accessToken}
            }).data;
    } catch (err) {
        throw _.extend(new Error("Failed to fetch identity from Wunderlist. " + err.message),
            {response: err.response});
    }
};


Github.retrieveCredential = function(credentialToken, credentialSecret) {
    return OAuth.retrieveCredential(credentialToken, credentialSecret);
};