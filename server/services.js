ServiceConfiguration.configurations.upsert(
    { service: "facebook" },
    {
        $set: {
            appId: Meteor.settings.public.facebook.app_id,
            secret: Meteor.settings.public.facebook.app_secret
        }
    }
);

ServiceConfiguration.configurations.upsert(
    { service: "github" },
    {
        $set: {
            clientId: Meteor.settings.public.github.client_id,
            secret: Meteor.settings.public.github.client_secret
        }
    }
);

ServiceConfiguration.configurations.upsert(
    { service: "fitbit" },
    {
        $set: {
            consumerKey: Meteor.settings.public.fitbit.consumer_key,
            secret: Meteor.settings.public.fitbit.consumer_secret,
            redirectUrl: Meteor.settings.public.fitbit.redirect_url
        }
    }
);

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


ServiceConfiguration.configurations.upsert(
    { service: "trello" },
    {
        $set: {
            clientKey: Meteor.settings.public.trello.client_key,
            secret: Meteor.settings.public.trello.client_secret,
            redirectUrl: Meteor.settings.public.trello.redirect_url
        }
    }
);



