Template.publisherTodoSubmit.events({
    'submit form': function(e) {
        e.preventDefault();

        var todo = {
            title: $(e.target).find('[name=title]').val(),
            listId: this._id
        };
        Meteor.call('todoInsert', todo, function(error, result) {});
    }
});