Wunderlist = {};

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
                    client_id: config.clientId,
                    client_secret: OAuth.openSecret(config.secret),
                    code: query.code
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
    var config = ServiceConfiguration.configurations.findOne({service: 'wunderlist'});
    try {
        return HTTP.get(
            "http://a.wunderlist.com/api/v1/user", {
                headers: {
                    "User-Agent": userAgent,
                    "X-Access-Token": accessToken,
                    "X-Client-ID": config.clientId
                }
            }).data;
    } catch (err) {
        throw _.extend(new Error("Failed to fetch identity from Wunderlist. " + err.message),
            {response: err.response});
    }
};


Wunderlist.retrieveCredential = function(credentialToken, credentialSecret) {
    return OAuth.retrieveCredential(credentialToken, credentialSecret);
};



Meteor.startup(function () {
    Meteor.methods({
        postList: function (accessToken) {
            var userAgent = "Meteor";
            if (Meteor.release)
                userAgent += "/" + Meteor.release;
            var config = ServiceConfiguration.configurations.findOne({service: 'wunderlist'});
            try {
                return HTTP.post(
                    "http://a.wunderlist.com/api/v1/lists", {
                        headers: {
                            "User-Agent": userAgent,
                            "X-Access-Token": accessToken,
                            "X-Client-ID": config.clientId
                        },
                        data: {
                            "title": 'Test'
                        }
                    }).data;
            } catch (err) {
                throw _.extend(new Error("Failed to fetch identity from Wunderlist. " + err.message),
                    {response: err.response});
            }
        }
    });
});



