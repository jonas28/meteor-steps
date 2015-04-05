Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function(){
        return [
            Meteor.subscribe('lists'),
            Meteor.subscribe('todos'),
            Meteor.subscribe('apps')
        ]
    }
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
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});