Exports = new Mongo.Collection('exports');

Meteor.methods({
    exportInsert: function(exportAttributes) {
        var user = Meteor.user();
        var exportedList = _.extend(exportAttributes, {
            userId: user._id,
            date: new Date()
        });

        var exportId = Exports.insert(exportedList);

        return {
            _id: exportId
        };
    }
});
