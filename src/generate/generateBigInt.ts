const zero = 0n;

// calculates the level of a given index in the current virtual tree
const getLevel = (base: bigint, index: bigint): bigint => {
  let level: bigint = 0n;
  let current: bigint = index;
  let parent: bigint;
  while (current > zero) {
    parent = (current - 1n) / base;
    level = level + 1n;
    current = parent;
  }

  return level;
};

export default function generate(index: bigint, alphabet: string): string {
  const n: bigint = BigInt(alphabet.length);
  let result: string = '';
  let l: bigint;
  let f: bigint;
  let rebasedPos: bigint;
  let rebasedIndex: bigint; // This will be BigInt, but used as number for array index

  while (index > zero) {
    // 1. calculate level
    l = getLevel(n, index);

    // 2. calculate first element in level
    f = 0n;
    for (let i = 0n; i < l; i++) { // i must be bigint for comparison with l
      f = f + (n ** i);
    }

    // 3. rebase current position and calculate current letter
    rebasedPos = index - f;
    rebasedIndex = rebasedPos % n;
    result = alphabet[Number(rebasedIndex)] + result; // Convert BigInt to Number for array indexing

    // 4. calculate parent number in the tree (next index)
    index = (index - 1n) / n;
  }

  return result;
}
