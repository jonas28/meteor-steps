Meteor.startup(function () {
    Template.callback.helpers({
        code: function(){
            return '123456';
        }
    });
});