// calculates the level of a given index in the current virtual tree
const getLevel = (base: number, index: number): number => {
  let level = 0;
  let current = index;
  let parent: number;
  while (current > 0) {
    parent = Math.floor((current - 1) / base);
    ++level;
    current = parent;
  }
  return level;
};

export default function generate(index: number, alphabet: string): string {
  if (!Number.isInteger(index) || index < 0) {
    throw new TypeError('index must be a non-negative integer');
  }
  if (index === 0) return '';
  const n = alphabet.length;
  let result = '';
  let l: number;
  let f: number;
  let rebasedPos: number;
  let rebasedIndex: number;
  while (index > 0) {
    l = getLevel(n, index);
    f = 0;
    for (let i = 0; i < l; i++) {
      f += Math.pow(n, i);
    }
    rebasedPos = index - f;
    rebasedIndex = ((rebasedPos % n) + n) % n; // ensure non-negative
    result = alphabet[rebasedIndex] + result;
    index = Math.floor((index - 1) / n);
  }
  return result;
}
