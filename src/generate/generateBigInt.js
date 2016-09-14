'use strict';

import bigInt from 'big-integer';

const zero = bigInt('0');

// calculates the level of a given index in the current virtual tree
const getLevel = (base, index) => {
  let level = bigInt('0');
  let current = index;
  let parent;
  while (current.gt(zero)) {
    parent = current.prev().divide(base);
    level = level.next();
    current = parent;
  }

  return level;
};

export default function generate(index, alphabet) {
  const n = bigInt(alphabet.length);
  let result = '';
  let l;
  let f;
  let rebasedPos;
  let rebasedIndex;

  while (index.gt(zero)) {
    // 1. calculate level
    l = getLevel(n, index);

    // 2. calculate first element in level
    f = bigInt('0');
    for (let i = 0; i < l; i++) {
      f = f.plus(n.pow(bigInt(i)));
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
