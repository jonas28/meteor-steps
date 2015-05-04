Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function(){
        return [
            Meteor.subscribe('lists'),
            Meteor.subscribe('todos'),
            Meteor.subscribe('apps'),
            Meteor.subscribe('users')
        ]
    }
});

Router.route('/publisher', {name: 'publisher'});

Router.route('/ulysses', {name: 'ulysses'});

Router.route('/publisher/lists/:_id', {
    name: 'publisherListPage',
    waitOn: function() {
        return [
            Meteor.subscribe('singleList', this.params._id),
        ];
    },
    data: function() { return Lists.findOne(this.params._id); }
});

Router.route('/publisher/lists/:_id/insights', {
    name: 'publisherListInsightsPage',
    waitOn: function() {
        return [
            Meteor.subscribe('singleList', this.params._id),
        ];
    },
    data: function() { return Lists.findOne(this.params._id); }
});

Router.route('/publisher/lists/:_id/settings', {
    name: 'publisherListSettingsPage',
    waitOn: function() {
        return [
            Meteor.subscribe('singleList', this.params._id),
        ];
    },
    data: function() { return Lists.findOne(this.params._id); }
});

Router.route('/publisher/lists/:listId/todos/:todoId', {
    name: 'publisherTodoPage',
    waitOn: function() {
        return [
            Meteor.subscribe('singleTodo', this.params.todoId),
            Meteor.subscribe('singleList', this.params.listId)
        ];
    },
    data: function() { return Todos.findOne(this.params.todoId); }
});

Router.route('/', {name: 'home'});

Router.route('/imprint', {name: 'imprint'});

Router.route('/lists/', {name: 'listsList'});

Router.route('/lists/:_id', {
    name: 'listPage',
    waitOn: function() {
        return [
            Meteor.subscribe('singleList', this.params._id)
        ];
    },
    data: function() { return Lists.findOne(this.params._id); }
});

Router.route('/lists/:_id/maintainers', {
    name: 'listDetailsMaintainers',
    waitOn: function() {
        return [
            Meteor.subscribe('singleList', this.params._id)
        ];
    },
    data: function() { return Lists.findOne(this.params._id); }
});


Router.route('/lists/:_id/contributors', {
    name: 'listDetailsContributors',
    waitOn: function() {
        return [
            Meteor.subscribe('singleList', this.params._id)
        ];
    },
    data: function() { return Lists.findOne(this.params._id); }
});

Router.route('/lists/:_id/pullrequests', {
    name: 'listDetailsPullrequests',
    waitOn: function() {
        return [
            Meteor.subscribe('singleList', this.params._id)
        ];
    },
    data: function() { return Lists.findOne(this.params._id); }
});

Router.route('/lists/:_id/forks', {
    name: 'listDetailsForks',
    waitOn: function() {
        return [
            Meteor.subscribe('singleList', this.params._id)
        ];
    },
    data: function() { return Lists.findOne(this.params._id); }
});

Router.route('/lists/:_id/activities', {
    name: 'listDetailsActivities',
    waitOn: function() {
        return [
            Meteor.subscribe('singleList', this.params._id)
        ];
    },
    data: function() { return Lists.findOne(this.params._id); }
});

Router.route('/todos/:_id', {
    name: 'todoPage',
    waitOn: function() {
        return [
            Meteor.subscribe('singleTodo', this.params._id)
        ];
    },
    data: function() { return Todos.findOne(this.params._id); }
});


Router.route('/todos/:_id/edit', {
    name: 'todoEdit',
    waitOn: function() {
        return Meteor.subscribe('singleTodo', this.params._id);
    },
    data: function() { return Todos.findOne(this.params._id); }
});

Router.route('/todos/:_id/pullrequest', {
    name: 'todoPullrequest',
    waitOn: function() {
        return Meteor.subscribe('singleTodo', this.params._id);
    },
    data: function() { return Todos.findOne(this.params._id); }
});

Router.route('/lists/:_id/edit', {
    name: 'listEdit',
    waitOn: function() {
        return Meteor.subscribe('singleList', this.params._id);
    },
    data: function() { return Lists.findOne(this.params._id); }
});

Router.route('/lists/:_id/submit/todo', {
    name: 'todoSubmit',
    waitOn: function() {
        return Meteor.subscribe('singleList', this.params._id);
    },
    data: function() { return Lists.findOne(this.params._id); }
});


Router.route('/apps/:_id', {
    name: 'appPage',
    data: function() { return Apps.findOne(this.params._id); }
});


Router.route('/submit/list', {name: 'listSubmit'});


Router.route('/user/:_id', {
    name: 'userPage',
    waitOn: function() {
        return Meteor.subscribe('singleUser', this.params._id);
    },
    data: function() { return Users.findOne(this.params._id); }
});

Router.route('/user/:_id/edit', {
    name: 'userEdit',
    waitOn: function() {
        return Meteor.subscribe('singleUser', this.params._id);
    },
    data: function() { return Users.findOne(this.params._id); }
});

Router.route('/user', {name: 'userList'});

var requireLogin = function() {
    if (! Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        this.next();
    }
}

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {
        only: 'publisher'
});

Router.onBeforeAction(requireLogin, {
    only: 'publisherListPage'
});

Router.onBeforeAction(requireLogin, {
    only: 'listEdit'
});

Router.onBeforeAction(requireLogin, {
    only: 'listSubmit'
});

Router.onBeforeAction(requireLogin, {
    only: 'todoEdit'
});

Router.onBeforeAction(requireLogin, {
    only: 'todoSubmit'
});