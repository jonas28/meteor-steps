Template.listDetailsMetainfos.helpers({
    todosCount: function() {
        return Todos.find({listId :  this._id}).count();
    },
    forksCount: function() {
        return Lists.find({original :  this._id}).count();
    }
});