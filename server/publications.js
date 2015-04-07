Meteor.publish('lists', function(options) {
    return Lists.find({}, options);
});

Meteor.publish('todos', function() {
    return Todos.find();
});

Meteor.publish('apps', function() {
    return Apps.find();
});

Meteor.publish('singleApp', function(id) {
    check(id, String);
    return Apps.find(id);
});

Meteor.publish('singleList', function(id) {
    check(id, String);
    return Lists.find(id);
});

Meteor.publish('singleTodo', function(id) {
    check(id, String);
    return Todos.find(id);
});

Meteor.publish('users', function() {
    return Users.find();
});