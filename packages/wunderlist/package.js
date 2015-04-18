Package.describe({
    name: 'wunderlist',
    summary: "wunderlist package",
    version: '0.0.1'
});

Package.onUse(function (api) {
    api.versionsFrom('0.9.4');
    api.export('Wunderlist');
    api.use([
        'iron:router'
    ]);

    // both
    api.addFiles([
        'lib/routers.js'
    ], ['client', 'server']);
    // client
    api.addFiles([
        'lib/client/templates/callback.html',
        'lib/client/templates/callback.js'
    ], ['client']);
    api.addFiles([
        'wunderlist.js'
    ], ['server']);


    api.export([
        'getTemplate',
        'templates'
    ]);

});