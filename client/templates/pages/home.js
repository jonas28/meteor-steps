Template.home.helpers({
    lists: function() {
        return Lists.find( { $or: [ {status : 'published'}, {status : 'earlyaccess'} ] });
    }
});
