'use strict';

// calculates the level of a given index in the current virtual tree

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generate;
var getLevel = function getLevel(base, index) {
  var level = 0;
  var current = index;
  var parent = void 0;
  while (current > 0) {
    parent = Math.floor((current - 1) / base);
    ++level;
    current = parent;
  }

  return level;
};

function generate(index, alphabet) {
  if (parseInt(Number(index), 10) !== index || index < 0) {
    throw new TypeError('index must be a non-negative integer');
  }

  var n = alphabet.length;
  var result = '';
  var l = void 0;
  var f = void 0;
  var rebasedPos = void 0;
  var rebasedIndex = void 0;

  while (index > 0) {
    // 1. calculate level
    l = getLevel(n, index);

    // 2. calculate first element in level
    f = 0;
    for (var i = 0; i < l; i++) {
      f += Math.pow(n, i);
    }

    // 3. rebase current position and calculate current letter
    rebasedPos = index - f;
    rebasedIndex = rebasedPos % n;
    result = alphabet[rebasedIndex] + result;

    // 4. calculate parent number in the tree (next index)
    index = Math.floor((index - 1) / n);
  }

  return result;
}