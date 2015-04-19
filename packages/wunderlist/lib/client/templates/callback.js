Meteor.startup(function () {
    Template.callback.helpers({
        code: function() {
            var code = Router.current().params.query.code
            return code;
        }
    });
});