// If you want debugging output run it this way:
// DEBUG=1 npm test
const debug = process.env['DEBUG'];
const {inspect} = require('util');
const ins = (x) => {
  if (debug) console.log(inspect(x, {depth: null}));
};

const buildLexer = require('@ull-esit-pl-1920/p10-t2-lexgen-code-alu0100969535');

const SPACE = /(?<SPACE>\s+|\/\/.*)/;
const RESERVEDWORD = /(?<RESERVEDWORD>\b(const|let)\b)/;
const ID = /(?<ID>\b([a-z_]\w*))\b/;
const STRING = /(?<STRING>"([^\\"]|\\.")*")/;
const OP = /(?<OP>[+*\/=-])/;

const myTokens = [
  ['SPACE', SPACE], ['RESERVEDWORD', RESERVEDWORD], ['ID', ID],
  ['STRING', STRING], ['OP', OP],
];

const lexer = buildLexer(myTokens);

function parseTest(string, expected) {
  ins(string);
  const result = lexer(string);
  ins(result);
  ins(expected);
  test(string, () => {
    expect(result).toEqual(expected);
  });
}

const str = 'const varName = "value"';
const expected = [
  {type: 'RESERVEDWORD', value: 'const'},
  {type: 'ID', value: 'varName'},
  {type: 'OP', value: '='},
  {type: 'STRING', value: '"value"'},
];

const str2 = 'let x = a + \nb';
const expected2 = [
  {type: 'RESERVEDWORD', value: 'let'},
  {type: 'ID', value: 'x'},
  {type: 'OP', value: '='},
  {type: 'ID', value: 'a'},
  {type: 'OP', value: '+'},
  {type: 'ID', value: 'b'},
];

const str3 = ' // Entrada con errores\nlet x = 42*c';
const expected3 = [
  {type: 'RESERVEDWORD', value: 'let'},
  {type: 'ID', value: 'x'},
  {type: 'OP', value: '='},
  {type: 'ERROR', value: '42*c'},
];

describe('Correct output', () => {
  parseTest(str, expected);
  parseTest(str2, expected2);
  parseTest(str3, expected3);
});

describe('Making it fail', () => {
  test('No \'ERROR\' token allowed in input', () => {
    expect(() => {
      const error = /someregexp/y;
      const lexer2 = buildLexer([['SPACE', SPACE], ['ERROR', error]]);
    }).toThrow();
  });
});
