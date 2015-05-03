Template.addCategory.events({
    'click .item': function(e) {
        e.preventDefault();
        // var currentListId = this._id;
        var currentListId = Template.parentData(1)._id;
        var selectedCategoryId = $(e.currentTarget).data('value');

        var listProperties = {
            categoryId: selectedCategoryId,
            categoryName: selectedCategoryId
        };

        Lists.update(currentListId, {$push: { categories: listProperties }}, function(error) {
            if (error) {
                // display the error to the user
                throwError(error.reason);
            }
        });
    }
});