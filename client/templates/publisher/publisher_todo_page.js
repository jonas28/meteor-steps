Template.publisherTodoPage.helpers({
    lists: function() {
        var userId = Meteor.userId();
        return Lists.find({"maintainers.userId" : userId});
    },
    todos: function() {
        return Todos.find({listId : this.listId}, {sort: {rank: 1}});
    },
    listTitle: function() {
     var List =  Lists.findOne({_id : this.listId});
        return List.title;
    }
});

Template.publisherTodoPage.rendered = function() {
    // TODO #50: Items sind noch nicht anfassbar und können nicht verschoben werden, vgl. dazu publisher_list_page.js
    this.$('#items').sortable({
        stop: function(e, ui) {
            // get the dragged html element and the one before
            //   and after it
            el = ui.item.get(0)
            before = ui.item.prev().get(0)
            after = ui.item.next().get(0)

            // Here is the part that blew my mind!
            //  Blaze.getData takes as a parameter an html element
            //    and will return the data context that was bound when
            //    that html element was rendered!
            if(!before) {
                //if it was dragged into the first position grab the
                // next element's data context and subtract one from the rank
                newRank = Blaze.getData(after).rank - 1
            } else if(!after) {
                //if it was dragged into the last position grab the
                //  previous element's data context and add one to the rank
                newRank = Blaze.getData(before).rank + 1
            }
            else
            //else take the average of the two ranks of the previous
            // and next elements
                newRank = (Blaze.getData(after).rank +
                Blaze.getData(before).rank)/2

            //update the dragged Item's rank
            Todos.update({_id: Blaze.getData(el)._id}, {$set: {rank: newRank}})
        }
    })
}