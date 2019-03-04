const postcss = require('postcss');
const valueParser = require('postcss-value-parser');

module.exports = postcss.plugin('shadow', () => {

    
    return function (css) {
        css.walkRules(rule => {
            
            rule.walkDecls(decl => {

                function shadows(depth) {

                    if (depth < 0 || depth > 25) {
                        result.warn('shadow depth is out of range. [0-25]');
                    }
                
                    const alpha = (num, in_min, in_max, out_min, out_max) => {
                        return Number(((num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min).toFixed(2));
                    }
                
                    return `0px ${Math.ceil(depth * .458333)}px ${Math.ceil(depth * .625)}px -${Math.ceil(depth * .29166)}px rgba(0, 0, 0, ${alpha(depth,0,25,0.1,0.35)}), 0px ${Math.ceil(depth)}px ${Math.ceil(depth * 1.5833)}px ${Math.ceil(depth * .125)}px rgba(0, 0, 0, ${alpha(depth,0,25,0.075,0.25)}), 0px ${Math.ceil(depth * .375)}px ${Math.ceil(depth * 1.916)}px ${Math.ceil(depth * .3333)}px rgba(0, 0, 0, ${alpha(depth,0,25,0.05,0.15)})`;
                
                }


                if (decl.value.includes('shadow')) {

                    const parsedValue = valueParser(decl.value)
                    parsedValue.walk(node => {
                        
                        if (node.value === 'shadow') {
                            
                            let val = parseInt(node.nodes[0].value);
                
                            node.value = shadows(val);

                            decl.value = parsedValue.toString().replace(`(${val})`, '');
                        }
                    })

                }

                if (decl.prop == "shadow") {

                    let shade = shadows(decl.value);
    
    
                    decl.cloneBefore({
                        prop: 'box-shadow',
                        value: shade
                    });
    
                    decl.remove();
                }


            })
        })
        
    };
});
