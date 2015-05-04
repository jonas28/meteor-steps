Template.listStatistics.helpers({
    ExportsCount: function() {
        return this.exports
    },
    todosCount: function() {
        return Todos.find({listId : this._id, status : 'published'}).count();
    },
    forksCount: function() {
        return Lists.find({original :  this._id}).count();
    }
});