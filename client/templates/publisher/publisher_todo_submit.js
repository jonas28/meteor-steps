Template.publisherTodoSubmit.events({
    'submit form': function(e) {
        e.preventDefault();

        var todo = {
            title: $(e.target).find('[name=title]').val(),
            listId: this._id
            // TODO #51: listId sollte aus dem URL params gezogen werden.
        };
        Meteor.call('todoInsert', todo, function(error, result) {
            Router.go('publisherTodoPage', {listId : todo.listId, todoId: result._id });
        });
    }
});