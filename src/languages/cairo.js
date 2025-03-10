const python = require('highlight.js/lib/languages/python');

function hljsDefineCairo(hljs) {
  const regex = hljs.regex;
  const cairoLanguage = python(hljs);

  const RESERVED_WORDS = [
    // control
    'if',
    'with',
    'with_attr',
    'else',

    // opcode
    'call',
    'jmp',
    'ret',
    'abs',
    'rel',

    // register
    'ap',
    'fp',

    // other
    'const',
    'let',
    'local',
    'tempvar',
    'felt',
    'as',
    'from',
    'import',
    'static_assert',
    'return',
    'assert',
    'member',
    'cast',
    'alloc_locals',
    'with',
    'with_attr',
    'nondet',
    'dw',
    'codeoffset',
    'new',
    'using',

    // sizeof
    'SIZEOF_LOCALS',
    'SIZE',

    // function
    'func',
    'end',
    'struct',
    'namespace',

    // directives
    'builtins',
    'lang',
  ];

  const BUILT_INS = [
    'HashBuiltin',
    'SignatureBuiltin',
    'BitwiseBuiltin',
    'EcOpBuiltin',
    'Uint256',
    'TRUE',
    'FALSE',
  ];

  const TYPES = [
    'felt',
  ];

  const KEYWORDS = {
    $pattern: /[A-Za-z]\w+|\w+_/,
    keyword: RESERVED_WORDS,
    built_in: BUILT_INS,
    type: TYPES,
  };

  if (typeof cairoLanguage.keywords !== 'object') {
    throw Error('Expected object');
  }

  Object.assign(cairoLanguage.keywords, KEYWORDS);

  const comment = cairoLanguage.contains.find(element => element.className === 'comment');
  if (comment !== undefined) {
    comment.begin = regex.lookahead(/\/\//);
    comment.contains = [
      {
        begin: /\/\//,
        end: /\b\B/,
        endsWithParent: true
      }
    ];
  }

  Object.assign(cairoLanguage, {
    name: 'Cairo',
    aliases: [
      'cairo'
    ]
  });

  return cairoLanguage;
}

module.exports = hljsDefineCairo;