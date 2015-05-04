Template.publisherTodoSubmit.events({
    'submit form': function(e) {
        e.preventDefault();


        var oldest = _.max(Todos.find({listId : this._id}).fetch(), function (todo) {
            return todo.rank;
        });

        console.log('oldest: ', oldest);

        var todo = {
            title: $(e.target).find('[name=title]').val(),
            listId: this._id
        };
        Meteor.call('todoInsert', todo, function(error, result) {
            Router.go('publisherTodoPage', {listId : todo.listId, todoId: result._id });
        });
    }
});