Meteor.startup(function () {
    Template[getTemplate('callback')].helpers({
        code: function(){
            return '123456';
        }
    });
});