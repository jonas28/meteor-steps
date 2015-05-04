

Template.listDetailsHeader.helpers({
    maintainer: function() {
        var userId = Meteor.userId();
        return _.contains(_.pluck(this.maintainers, 'userId'), userId);
    },
    apps: function() {
        return Apps.find();
    },
    counter: function () {
        console.log('counter helper is running')
        return Wunderlist.getCount();
    }
});


Template.listDetailsHeader.created = function () {
    this.exportedTodosCount = new ReactiveVar();
    this.exportedTodosCount.set(50);
    // TODO: set exportedTodosCount from wunderlist_client.js
    // see more about reactive vars at: http://docs.meteor.com/#/full/reactivevar
};


Template.listDetailsHeader.rendered = function () {
    this.$('.dropdown').dropdown({
        // you can use any ui transition
        transition: 'drop',
        onChange: function(value) {
            $('.ui.modal').modal('show');
        }
    });
    this.$('#export').progress({
        percent: Template.instance().exportedTodosCount.get()
    });
};


