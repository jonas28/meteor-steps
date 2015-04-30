
Template.searchBox.helpers({
    lists: function(){
        return Lists.find().fetch().map(function(it){
            return {value: it.title, id: it._id};
        });
    },
    selected: function(e, suggestion, dataset) {
        // console.log("selected: " + suggestion.id);
        Router.go('listPage', {_id: suggestion.id});
    }
});

Template.searchBox.rendered = function() {
    Meteor.typeahead.inject();
};