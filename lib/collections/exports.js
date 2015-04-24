Exports = new Mongo.Collection('exports');

Meteor.methods({
    exportInsert: function(exportAttributes) {
        var user = Meteor.user();
        var export = _.extend(exportAttributes, {
            userId: user._id,
            exported: new Date()
        });

        var exportId = Exports.insert(export);

        return {
            _id: exportId
        };
    }
});
