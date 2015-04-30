Template.publisherTodoSubmit2.events({
    'submit form': function(e) {
        e.preventDefault();

        var todo = {
            title: $(e.target).find('[name=title]').val(),
            listId: this.listId
        };

        Meteor.call('todoInsert', todo, function(error, result) {
            Router.go('publisherTodoPage', {listId : todo.listId, todoId: result._id });
        });
    }
});