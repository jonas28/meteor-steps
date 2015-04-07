Template.listDetailsTodos.helpers({
    todos: function() {
        return Todos.find({listId : this._id, status : 'published'}, {sort: {rank: 1}});
    }
});