Meteor.startup(function () {
    Router.route('/callback', {
        name: 'callback',
        template: getTemplate('callback')
    });
});



