'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generate;

var _bigInteger = require('big-integer');

var _bigInteger2 = _interopRequireDefault(_bigInteger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var zero = (0, _bigInteger2.default)('0');

// calculates the level of a given index in the current virtual tree
var getLevel = function getLevel(base, index) {
  var level = (0, _bigInteger2.default)('0');
  var current = index;
  var parent = void 0;
  while (current.gt(zero)) {
    parent = current.prev().divide(base);
    level = level.next();
    current = parent;
  }

  return level;
};

function generate(index, alphabet) {
  var n = (0, _bigInteger2.default)(alphabet.length);
  var result = '';
  var l = void 0;
  var f = void 0;
  var rebasedPos = void 0;
  var rebasedIndex = void 0;

  while (index.gt(zero)) {
    // 1. calculate level
    l = getLevel(n, index);

    // 2. calculate first element in level
    f = (0, _bigInteger2.default)('0');
    for (var i = 0; i < l; i++) {
      f = f.plus(n.pow((0, _bigInteger2.default)(i)));
    }

    // 3. rebase current position and calculate current letter
    rebasedPos = index.minus(f);
    rebasedIndex = rebasedPos.mod(n);
    result = alphabet[rebasedIndex] + result;

    // 4. calculate parent number in the tree (next index)
    index = index.prev().divide(n);
  }

  return result;
}