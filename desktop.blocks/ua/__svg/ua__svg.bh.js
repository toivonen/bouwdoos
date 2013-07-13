module.exports = function(bh) {

    bh.match('ua', function(ctx) {
        ctx.content([
            ctx.content(),
            ';(function(d,e,c,r,n,w,v,f){' +
                'e=d.documentElement;' +
                'c="className";' +
                'r="replace";' +
                'n="createElementNS";' +
                'f="firstChild";' +
                'w="http://www.w3.org/2000/svg";' +
                'e[c]+=!!d[n]&&!!d[n](w,"svg").createSVGRect?" ua_svg_yes":" ua_svg_no";' +
                'v=d.createElement("div");' +
                'v.innerHTML="<svg/>";' +
                'e[c]+=(v[f]&&v[f].namespaceURI)==w?" ua_inlinesvg_yes":" ua_inlinesvg_no";' +
            '})(document);'
        ], true);
    });

};
