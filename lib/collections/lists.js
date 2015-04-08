Lists = new Mongo.Collection('lists');


Meteor.methods({
    listInsert: function(listAttributes) {
        var user = Meteor.user();
        var list = _.extend(listAttributes, {
            maintainers: [{userId: user._id, userName: user.username}],
            activities: [{userId: user._id, userName: user.username, activity: 'created', date: new Date()}],
            created: new Date(),
            shares: 1
        });

        var listId = Lists.insert(list);

        return {
            _id: listId
        };
    },
    listFork: function(listAttributes) {
        check(this.userId, String);
        var user = Meteor.user();
        var list = _.extend(listAttributes, {
            maintainers: [{userId: user._id, userName: user.username}],
            created: new Date()
        });

        var listId = Lists.insert(list);

        return {
            _id: listId
        };
    }
});


