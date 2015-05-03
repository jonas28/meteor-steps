Template.listDetailsHeader.helpers({
    maintainer: function() {
        var userId = Meteor.userId();
        return _.contains(_.pluck(this.maintainers, 'userId'), userId);
    },
    apps: function() {
        return Apps.find();
    }
});

Template.listDetailsHeader.rendered = function () {
    this.$('.dropdown')
        .dropdown({
            // you can use any ui transition
            transition: 'drop',
            onChange: function(value) {
                $('.ui.modal')
                    .modal('show')
                ;
            }
        })
    ;

};


