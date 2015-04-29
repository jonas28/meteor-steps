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
        postListServer: function (accessToken, listId) {
            var list = Lists.findOne({_id : listId});
            var listTitle = list.title;
            console.log('listTitle: ' + listTitle)
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
                            "title": listTitle
                        }
                    }).data;
            } catch (err) {
                throw _.extend(new Error("Failed to post List to Wunderlist. " + err.message),
                    {result: err.result});
            }
        },
        postListTest: function (accessToken, listId, listTitle) {
            // var list = Lists.findOne({_id : listId});
            // var list = Lists.findOne(listId);

            // return 'AccessToken: ' + accessToken + 'listId: ' + listId ;
            return listId;

        },
        postTodos: function (accessToken, todoTitle, wunderlistId) {
            var userAgent = "Meteor";
            if (Meteor.release)
                userAgent += "/" + Meteor.release;
            var config = ServiceConfiguration.configurations.findOne({service: 'wunderlist'});
            try {
                return HTTP.post(
                    "http://a.wunderlist.com/api/v1/tasks", {
                        headers: {
                            "User-Agent": userAgent,
                            "X-Access-Token": accessToken,
                            "X-Client-ID": config.clientId
                        },
                        data: {
                            "list_id": wunderlistId,
                            "title": todoTitle
                        }
                    }).data;
            } catch (err) {
                throw _.extend(new Error("Failed to post Todos to Wunderlist. " + err.message),
                    {response: err.response});
            }
        },
        postComment: function (accessToken, todoComment, todoId) {
            var userAgent = "Meteor";
            if (Meteor.release)
                userAgent += "/" + Meteor.release;
            var config = ServiceConfiguration.configurations.findOne({service: 'wunderlist'});
            try {
                return HTTP.post(
                    "http://a.wunderlist.com/api/v1/notes", {
                        headers: {
                            "User-Agent": userAgent,
                            "X-Access-Token": accessToken,
                            "X-Client-ID": config.clientId
                        },
                        data: {
                            "task_id": todoId,
                            "content": todoComment
                        }
                    }).data;
            } catch (err) {
                throw _.extend(new Error("Failed to post Comment to Wunderlist. " + err.message),
                    {response: err.response});
            }
        },
    });
});



