Wunderlist = {};

// Request Github credentials for the user
// @param options {optional}
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
Wunderlist.requestCredential = function (options, credentialRequestCompleteCallback) {
    // support both (options, callback) and (callback).
    if (!credentialRequestCompleteCallback && typeof options === 'function') {
        credentialRequestCompleteCallback = options;
        options = {};
    }

    var config = ServiceConfiguration.configurations.findOne({service: 'wunderlist'});
    if (!config) {
        credentialRequestCompleteCallback && credentialRequestCompleteCallback(
            new ServiceConfiguration.ConfigError());
        return;
    }
    var credentialToken = Random.secret();

    var loginStyle = OAuth._loginStyle('wunderlist', config, options);

    var loginUrl =
        'https://www.wunderlist.com/oauth/authorize' +
        '?client_id=' + config.clientId +
        '&redirect_uri=' + config.redirectUrl +
        '&state=' + OAuth._stateParam(loginStyle, credentialToken);

    OAuth.launchLogin({
        loginService: "wunderlist",
        loginStyle: loginStyle,
        loginUrl: loginUrl,
        credentialRequestCompleteCallback: credentialRequestCompleteCallback,
        credentialToken: credentialToken,
        popupOptions: {width: 900, height: 450}
    });
};

Wunderlist.postList = function(listId) {
    var userId = Meteor.userId();
    var user = Users.findOne(userId);
    var accessToken = user.services.wunderlist.accessToken;
    Meteor.call('postList', accessToken , listId , function(err, result) {
        // console.log('listId: ' + listId);
        var exportedList = {
            listId: listId,
            app: 'Wunderlist',
            externalObjectId: result.id
        };
        Meteor.call('exportInsert', exportedList, function(error) {
            if (error)
                return throwError(error.reason);
        });
        var originalTodos = Todos.find({listId : listId, status : 'published'}, {sort: {rank: 1}});
        originalTodos.forEach(function (todo) {
            var todoTitle = todo.title;
            var wunderlistId = result.id;
            var todoComment = todo.comment;
            Meteor.call('postTodos', accessToken , todoTitle , wunderlistId , function(error, result) {
                if (error)
                    return throwError(error.reason);

                var todoId = result.id;
                Meteor.call('postComment', accessToken , todoComment , todoId , function(error) {
                    if (error)
                        return throwError(error.reason);
                });
            });


        });
    });
};

