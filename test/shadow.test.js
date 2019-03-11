import postcss from 'postcss';
import test    from 'ava';

var plugin = require('../index.js');
function run(t, input, output, opts = { }) {
  return postcss([ plugin(opts) ]).process(input, {from: undefined})
    .then( result => {
      t.deepEqual(result.css, output);
      t.deepEqual(result.warnings().length, 0);
  });
}

test('handles shadows depth 0', t => {
  return run(t,
    '.shadow { shadow: 0; }',
    '.shadow { box-shadow: 0px 0px 0px -0px rgba(0, 0, 0, 0.1), 0px 0px 0px 0px rgba(0, 0, 0, 0.07), 0px 0px 0px 0px rgba(0, 0, 0, 0.05); }'
  );
});

test('handles shadows depth 5', t => {
    return run(t,
      '.shadow { shadow: 5; }',
      '.shadow { box-shadow: 0px 3px 4px -2px rgba(0, 0, 0, 0.15), 0px 5px 8px 1px rgba(0, 0, 0, 0.11), 0px 2px 10px 2px rgba(0, 0, 0, 0.07); }'
    );
});


test('handles shadows depth 10', t => {
  return run(t,
    '.shadow { shadow: 10; }',
    '.shadow { box-shadow: 0px 5px 7px -3px rgba(0, 0, 0, 0.2), 0px 10px 16px 2px rgba(0, 0, 0, 0.15), 0px 4px 20px 4px rgba(0, 0, 0, 0.09); }'
  );
});

test('handles shadows depth 15', t => {
  return run(t,
    '.shadow { shadow: 15; }',
    '.shadow { box-shadow: 0px 7px 10px -5px rgba(0, 0, 0, 0.25), 0px 15px 24px 2px rgba(0, 0, 0, 0.18), 0px 6px 29px 5px rgba(0, 0, 0, 0.11); }'
  );
});

test('handles shadows depth 20', t => {
  return run(t,
    '.shadow { shadow: 20; }',
    '.shadow { box-shadow: 0px 10px 13px -6px rgba(0, 0, 0, 0.3), 0px 20px 32px 3px rgba(0, 0, 0, 0.22), 0px 8px 39px 7px rgba(0, 0, 0, 0.13); }'
  );
});

test('handles shadows depth 25', t => {
  return run(t,
    '.shadow { shadow: 25; }',
    '.shadow { box-shadow: 0px 12px 16px -8px rgba(0, 0, 0, 0.35), 0px 25px 40px 4px rgba(0, 0, 0, 0.25), 0px 10px 48px 9px rgba(0, 0, 0, 0.15); }'
  );
});

test('handles inline shadows depth 25', t => {
  return run(t,
    '.shadow { box-shadow: 0 0 8px #000, shadow( 25), 0 0 8px #fff; }',
    '.shadow { box-shadow: 0 0 8px #000, 0px 12px 16px -8px rgba(0, 0, 0, 0.35), 0px 25px 40px 4px rgba(0, 0, 0, 0.25), 0px 10px 48px 9px rgba(0, 0, 0, 0.15), 0 0 8px #fff; }'
  );
});


test('handles shadows depth 5 with color', t => {
    return run(t,
      '.shadow { shadow: 5 #00ddff; }',
      '.shadow { box-shadow: 0px 3px 4px -2px rgba(0, 221, 255, 0.15), 0px 5px 8px 1px rgba(0, 221, 255, 0.11), 0px 2px 10px 2px rgba(0, 221, 255, 0.07); }'
    );
});

test('Handles inline shadow with color', t => {
  return run(t,
    '.shadow { box-shadow: shadow(15 #f00); }',
    '.shadow { box-shadow: 0px 7px 10px -5px rgba(255, 0, 0, 0.25), 0px 15px 24px 2px rgba(255, 0, 0, 0.18), 0px 6px 29px 5px rgba(255, 0, 0, 0.11); }'
  );
});
