Todos = new Mongo.Collection('todos');

validateTodo = function (todo) {
    var errors = {};

    if (!todo.title)
        errors.title = "Please fill in a title";

    return errors;
}

Meteor.methods({
    todoInsert: function(todoAttributes) {
        check(this.userId, String);
        

        var errors = validateTodo(todoAttributes);
        if (errors.title)
            throw new Meteor.Error('invalid-post', "You must set a title for your todo");

        var user = Meteor.user();
        var todo = _.extend(todoAttributes, {
            maintainers: [{userId: user._id, userName: user.username}],
            activities: [{userId: user._id, userName: user.username, activity: 'created', date: new Date()}],
            shares: 1,
            status: 'draft'
        });


        var todoId = Todos.insert(todo);

        return {
            _id: todoId
        };
    },
    todoFork: function(todoAttributes) {
        check(this.userId, String);

        var errors = validateTodo(todoAttributes);
        if (errors.title)
            throw new Meteor.Error('invalid-post', "You must set a title for your todo");

        var user = Meteor.user();
        var todo = _.extend(todoAttributes, {
            maintainers: [{userId: user._id, userName: user.username}]
        });

        var todoId = Todos.insert(todo);

        return {
            _id: todoId
        };
    }
});
