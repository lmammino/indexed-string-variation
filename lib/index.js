'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultAlphabet = undefined;
exports.generator = generator;

var _bigInteger = require('big-integer');

var _bigInteger2 = _interopRequireDefault(_bigInteger);

var _generateInt = require('./generate/generateInt');

var _generateInt2 = _interopRequireDefault(_generateInt);

var _generateBigInt = require('./generate/generateBigInt');

var _generateBigInt2 = _interopRequireDefault(_generateBigInt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultAlphabet = exports.defaultAlphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
function generator(alphabet) {
  // remove duplicates from alphabets
  var cleanAlphabet = function cleanAlphabet(alphabet) {
    return alphabet.split('').filter(function (item, pos, self) {
      return self.indexOf(item) === pos;
    }).join('');
  };

  if (alphabet && typeof alphabet !== 'string') {
    throw new TypeError('alphabet must be a string');
  }

  alphabet = alphabet ? cleanAlphabet(alphabet) : defaultAlphabet;

  // string generation function
  var generate = function generate(index) {
    return index instanceof _bigInteger2.default ? (0, _generateBigInt2.default)(index, alphabet) : (0, _generateInt2.default)(index, alphabet);
  };

  generate.alphabet = alphabet;

  return generate;
}

exports.default = generator;