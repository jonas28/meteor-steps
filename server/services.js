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




