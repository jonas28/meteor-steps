Template.listDetailsPullrequests.helpers({
    pullrequests: function() {
        return Todos.find({listId : this._id, status : 'pullrequest'});
    }
});