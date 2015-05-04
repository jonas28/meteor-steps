Template.ulysses.rendered = function () {
    $('.attached.demo .ui.sidebar')
        .sidebar({
            context: $('.attached.demo .bottom.segment')
        })
        .sidebar('attach events', '.attached.demo .menu .item')
    ;
};


