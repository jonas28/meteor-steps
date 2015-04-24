Exports = new Mongo.Collection('exports');

Meteor.methods({
    exportInsert: function(exportAttributes) {
        var user = Meteor.user();
        var exportedList = _.extend(exportAttributes, {
            userId: user._id,
            date: new Date()
        });

        var exportId = Exports.insert(exportedList);
        var listId = exportAttributes._id;
        Lists.update(listId, { $inc: {exports: 1}}, function(error) {
            if (error)
                throwError(error.reason);
        });

        return {
            _id: exportId
        };
    }
});
