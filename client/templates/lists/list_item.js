Template.listItem.helpers({
    todos: function() {
        return Todos.find({listId : this._id});
    },
    todosCount: function() {
        return Todos.find({listId : this._id, status : 'published'}).count();
    },
    forksCount: function() {
        return Lists.find({original :  this._id}).count();
    },
    isEarlyaccess: function() {
        return this.status == 'earlyaccess';
    },
    isFork: function() {
        return (typeof this.original != 'undefined');
    },
    categories: function() {
        return this.categories;
    }
});