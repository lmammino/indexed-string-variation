'use strict';

// calculates the level of a given index in the current virtual tree
const getLevel = (base, index) => {
  let level = 0;
  let current = index;
  let parent;
  while (current > 0) {
    parent = Math.floor((current - 1) / base);
    ++level;
    current = parent;
  }

  return level;
};

export default function generate(index, alphabet) {
  if (parseInt(Number(index), 10) !== index || index < 0) {
    throw new TypeError('index must be a non-negative integer');
  }

  const n = alphabet.length;
  let result = '';
  let l;
  let f;
  let rebasedPos;
  let rebasedIndex;

  while (index > 0) {
    // 1. calculate level
    l = getLevel(n, index);

    // 2. calculate first element in level
    f = 0;
    for (let i = 0; i < l; i++) {
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
