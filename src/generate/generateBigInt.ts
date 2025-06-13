const zero = 0n;

// calculates the level of a given index in the current virtual tree
const getLevel = (base: bigint, index: bigint): bigint => {
  let level = 0n;
  let current = index;
  let parent: bigint;
  while (current > 0n) {
    parent = (current - 1n) / base;
    level++;
    current = parent;
  }
  return level;
};

export default function generate(index: bigint, alphabet: string): string {
  if (typeof index !== 'bigint' || index < 0n) {
    throw new TypeError('index must be a non-negative bigint');
  }
  if (index === 0n) return '';
  const n = BigInt(alphabet.length);
  let result = '';
  let l: bigint;
  let f: bigint;
  let rebasedPos: bigint;
  let rebasedIndex: bigint;
  while (index > 0n) {
    l = getLevel(n, index);
    f = 0n;
    for (let i = 0n; i < l; i++) {
      f += n ** i;
    }
    rebasedPos = index - f;
    rebasedIndex = ((rebasedPos % n) + n) % n; // ensure non-negative
    result = alphabet[Number(rebasedIndex)] + result;
    index = (index - 1n) / n;
  }
  return result;
}
