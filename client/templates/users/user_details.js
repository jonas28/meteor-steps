Template.userDetails.helpers({
    profile: function() {
        var user =  Users.findOne({_id : this._id});
        return user.profile;
    },
    ownsProfile: function() {
        var userId = Meteor.userId();
        return this._id === userId;
    },
    exports: function() {
        return Exports.find( { 'userId' : this._id});
    },
    lists: function() {
        return Lists.find( { 'maintainers.userId' : this._id});
    }
});

