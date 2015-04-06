Template.publisherListPage.helpers({
    lists: function() {
        var userId = Meteor.userId();
        return Lists.find({"maintainers.userId" : userId});
    },
    todos: function() {
        return Todos.find({listId : this._id});
    }
});