Template.listItem.helpers({
    todos: function() {
        return Todos.find({listId : this._id});
    },
    todosCount: function() {
        return Todos.find({listId : this._id, status : 'published'}).count();
    },
    exportsCount: function() {
        return Exports.find({listId : this._id}).count();
    },
    forksCount: function() {
        return Lists.find({original :  this._id}).count();
    },
    isEarlyaccess: function() {
        return this.status == 'earlyaccess';
    }
});

