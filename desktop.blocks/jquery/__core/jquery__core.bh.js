module.exports = function(bh) {

    bh.match('jquery__core', function() {
        return {
            block: 'page',
            elem: 'js',
            url: '//yandex.st/jquery/1.7.2/jquery.min.js'
        };
    });

};
