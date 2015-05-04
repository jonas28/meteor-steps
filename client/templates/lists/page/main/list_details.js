Template.listDetails.helpers({
    originals: function() {
        return Lists.find({_id : this.original});
    },
    forks: function() {
        return Lists.find({original : this._id});
    },
    isEarlyaccess: function() {
        return this.status == 'earlyaccess';
    }
});
