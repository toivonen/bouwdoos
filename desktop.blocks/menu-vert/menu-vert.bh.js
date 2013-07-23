module.exports = function(bh) {

    bh.match('menu-vert', function(ctx) {
        ctx.tag('ul')
    });

    bh.match('menu-vert__item', function(ctx) {
        ctx.tag('li')
    });

}
