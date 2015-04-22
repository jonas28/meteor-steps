Template.appExportbuttonItem.events({
    'click .exportToWunderlist': function(e) {
        e.preventDefault();
        var listId = this._id;
        // TODO: Export doesn`t work in apps item.
        return Wunderlist.postList(listId);
    },
    'click .exportToEvernote': function(e) {
        e.preventDefault();
        alert('coming soon!');
    }
});