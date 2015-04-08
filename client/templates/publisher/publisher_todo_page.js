Template.publisherTodoPage.helpers({
    lists: function() {
        var userId = Meteor.userId();
        return Lists.find({"maintainers.userId" : userId});
    },
    todos: function() {
        return Todos.find({listId : this.listId});
    },
    listTitle: function() {
     var List =  Lists.findOne({_id : this.listId});
        return List.title;
    }
});