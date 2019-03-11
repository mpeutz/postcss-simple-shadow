const postcss = require('postcss');
const valueParser = require('postcss-value-parser');
const tinycolor = require('tinycolor2');

const errorContext = {
	plugin: 'postcss-simple-shadow'
};

module.exports = postcss.plugin('shadow', () => {


    return function (css) {
        css.walkRules(rule => {

            rule.walkDecls(decl => {

                function shadows(depth, hue) {

                    if (depth < 0 || depth > 25) {
                        throw decl.error('shadow depth is out of range. [0-25]', errorContext);
                    }


                    const alpha = (num, in_min, in_max, out_min, out_max) => {
                        return Number(((num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min).toFixed(2));
                    }

                    return `0px ${Math.ceil(depth * .458333)}px ${Math.ceil(depth * .625)}px -${Math.ceil(depth * .29166)}px ${tinycolor(hue).setAlpha(alpha(depth,0,25,0.1,0.35)).toRgbString()}, 0px ${Math.ceil(depth)}px ${Math.ceil(depth * 1.5833)}px ${Math.ceil(depth * .125)}px ${tinycolor(hue).setAlpha(alpha(depth,0,25,0.075,0.25)).toRgbString()}, 0px ${Math.ceil(depth * .375)}px ${Math.ceil(depth * 1.916)}px ${Math.ceil(depth * .3333)}px ${tinycolor(hue).setAlpha(alpha(depth,0,25,0.05,0.15)).toRgbString()}`;

                }

                function parseParams(val) {

                    let shadowParams = [];
                    

                    if (val.trim().indexOf(' ') != -1) {
                        shadowParams = val
                            .match(/^(\S+)\s(.*)/).slice(1)
                            .map(str => str.trim());
                    } else {
                        shadowParams = [val, '#000'];
                    }

                    if (! tinycolor(shadowParams[1]).isValid()) {
                        throw decl.error('Not a valid color', errorContext);
                    }


                    let dpth = parseInt(shadowParams[0]);
                    let col = shadowParams[1];

                    return [dpth, col]
                }


                if (decl.value.includes('shadow')) {

                    const parsedValue = valueParser(decl.value)

                    parsedValue.walk(node => {


                        if (node.value === 'shadow') {


                            let shade = parseParams(valueParser.stringify(node.nodes));
                            let rep = valueParser.stringify(node).replace('shadow', '');

                            node.value = shadows(shade[0], shade[1]);

                            decl.value = parsedValue.toString().replace(`${rep}`, '');
                        }
                    })

                }

                if (decl.prop == "shadow") {

                    let shade = parseParams(decl.value);

                    decl.cloneBefore({
                        prop: 'box-shadow',
                        value: shadows(shade[0], shade[1])
                    });

                    decl.remove();
                }


            })
        })

    };
});