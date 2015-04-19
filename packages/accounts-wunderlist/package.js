Package.describe({
    summary: "Login service for Wunderlist accounts",
    version: "1.0.4"
});

Package.onUse(function(api) {
    api.use('accounts-base', ['client', 'server']);
    // Export Accounts (etc) to packages using this one.
    api.imply('accounts-base', ['client', 'server']);
    api.use('accounts-oauth', ['client', 'server']);
    api.use('wunderlist', ['client', 'server']);

    api.addFiles('wunderlist_login_button.css', 'client');

    api.addFiles("wunderlist.js");
});