Deployed to steps.meteor.com

# Wunderlist oAuth
To use the wunderlist oauth you need to setup Wunderlist. Go to https://developer.wunderlist.com/applications/new and create a new app

Create a file settings.json and add it to your .gitignore. And save the Client ID, Client Secret and Authorization Callback URL form Wunderlist in your settings.json file.
```
{
  "public":{
    "wunderlist": {
      "client_id": "XXX",
      "client_secret": "XXX",
      "redirect_url": "XXX"
    }
  }
}
```
Then create a services.js file in the server directory
```
ServiceConfiguration.configurations.upsert(
    { service: "wunderlist" },
    {
        $set: {
            clientId: Meteor.settings.public.wunderlist.client_id,
            secret: Meteor.settings.public.wunderlist.client_secret,
            redirectUrl: Meteor.settings.public.wunderlist.redirect_url
        }
    }
);
```
