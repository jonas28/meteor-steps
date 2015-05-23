Package.describe({
  summary: "Fitibt OAuth flow",
  // internal for now. Should be external when it has a richer API to do
  // actual API things with the service, not just handle the OAuth flow.
  internal: true
});

Package.on_use(function(api) {
  api.use('http', ['client', 'server']);
  api.use('templating', 'client');
  api.use('oauth1', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('random', 'client');
  api.use('underscore', 'server');
  api.use('service-configuration', ['client', 'server']);

  api.export('Fitbit');

  api.add_files(
    ['fitbit_configure.html', 'fitbit_configure.js'],
    'client');

  api.add_files('fitbit_server.js', 'server');
  api.add_files('fitbit_client.js', 'client');
});