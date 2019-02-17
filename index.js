const postcss = require('postcss');

module.exports = postcss.plugin('shadow', function () {
    return function (css, result) {
        css.walkDecls('shadow', function (decl) {

            const depth = decl.value;

            if (depth < 0 || depth > 25) {
                result.warn('shadow depth is out of range. [0-25]');
            }

            shade = `0px ${Math.ceil(depth * .458333)}px ${Math.ceil(depth * .625)}px -${Math.ceil(depth * .29166)}px rgba(0, 0, 0, 0.2), 0px ${Math.ceil(depth)}px ${Math.ceil(depth * 1.5833)}px ${Math.ceil(depth * .125)}px rgba(0, 0, 0, 0.14), 0px ${Math.ceil(depth * .375)}px ${Math.ceil(depth * 1.916)}px ${Math.ceil(depth * .3333)}px rgba(0, 0, 0, 0.12)`


            decl.cloneBefore({
                prop: 'box-shadow',
                value: shade
            });
            
            decl.remove();
        });

    }
});