Template.listDetailsForks.helpers({
    forks: function() {
        return Lists.find({original : this._id});
    }
});