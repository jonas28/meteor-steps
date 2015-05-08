Template.listDetailsHeader.helpers({
    maintainer: function() {
        var userId = Meteor.userId();
        return _.contains(_.pluck(this.maintainers, 'userId'), userId);
    },
    apps: function() {
        return Apps.find();
    },
    counter: function () {
        // console.log('counter helper is running');
        return Session.get('exportedTodosCount');
        // return Template.instance().exportedTodosCount.get()
    }
});

Template.listDetailsHeader.events({
    'click .exportToWunderlist': function(e) {
        e.preventDefault();
        var listId = Template.parentData(1)._id;
        return Wunderlist.postList(listId);
    },
    'click .exportToEvernote': function(e) {
        e.preventDefault();
    }
});


Template.listDetailsHeader.created = function () {
    // this.exportedTodosCount = new ReactiveVar();
    // this.exportedTodosCount.set(50);
    // this.exportedTodosCount.set(50);
    // TODO: set exportedTodosCount from wunderlist_client.js
    // see more about reactive vars at: http://docs.meteor.com/#/full/reactivevar
};


Template.listDetailsHeader.rendered = function () {
    this.$('.dropdown').dropdown({
        // you can use any ui transition
        transition: 'drop',
        onChange: function(value) {
            $('.ui.modal').modal('show');
            // TODO: Session exportedTodosCount has to be set to 0 after closing the modal.
        }
    });
    this.$('#export').progress({
        percent: (Session.get('exportedTodosCount') / Session.get('originalTodosCount'))*100
        // TODO: percent should be reactiv to move the progress bar.
    });
};