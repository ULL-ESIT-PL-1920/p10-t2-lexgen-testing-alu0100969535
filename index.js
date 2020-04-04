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
const str = 'const varName = "value"';
const result = lexer(str);
// Fast test
console.log(result);