Package.describe({
    summary: "Login service for Trello accounts",
    version: "1.0.0"
});

Package.onUse(function(api) {
    api.use('accounts-base', ['client', 'server']);
    // Export Accounts (etc) to packages using this one.
    api.imply('accounts-base', ['client', 'server']);
    api.use('accounts-oauth', ['client', 'server']);
    api.use('trello', ['client', 'server']);

    api.addFiles('trello_login_button.css', 'client');

    api.addFiles("trello.js");
});