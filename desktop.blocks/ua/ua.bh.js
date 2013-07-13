module.exports = function(bh) {

    bh.match('ua', function(ctx) {
        ctx.tag('script');
        ctx.bem(false);
        ctx.content([
            ctx.content(),
            ';(function(d,e,c,r){' +
                'e=d.documentElement;' +
                'c="className";' +
                'r="replace";' +
                'e[c]=e[c][r]("ua_js_no","ua_js_yes");' +
                'if(d.compatMode!="CSS1Compat")' +
                'e[c]=e[c][r]("ua_css_standart","ua_css_quirks")' +
            '})(document);'
        ], true);
    });

};
