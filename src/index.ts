export const defaultAlphabet =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

function cleanAlphabet(alphabet: string) {
  return Array.from(new Set(alphabet.split(''))).join('')
}

// calculates the level of a given index in the current virtual tree
const getLevel = (base: bigint, index: bigint): bigint => {
  let level = 0n
  let current = index
  let parent: bigint
  while (current > 0n) {
    parent = (current - 1n) / base
    level++
    current = parent
  }
  return level
}

// Generates a string based on the given index and alphabet
function generateString(startIndex: bigint, alphabet: string): string {
  if (startIndex === 0n) return ''
  const n = BigInt(alphabet.length)
  let result = ''
  let l: bigint
  let f: bigint
  let rebasedPos: bigint
  let rebasedIndex: bigint
  let index = startIndex
  while (index > 0n) {
    l = getLevel(n, index)
    f = 0n
    for (let i = 0n; i < l; i++) {
      f += n ** i
    }
    rebasedPos = index - f
    rebasedIndex = ((rebasedPos % n) + n) % n // ensure non-negative
    result = alphabet[Number(rebasedIndex)] + result
    index = (index - 1n) / n
  }
  return result
}

export type GenOptions = {
  alphabet?: string
  from?: bigint
  to?: bigint
  maxLen?: number
  maxIterations?: number
}

export function* indexedStringVariation(options: GenOptions = {}) {
  const alphabet = options.alphabet
    ? cleanAlphabet(options.alphabet)
    : defaultAlphabet
  const from = options.from ?? 0n

  let iterations = 0
  let i = from

  while (true) {
    const str = generateString(i, alphabet)

    if (options.maxLen !== undefined && str.length > options.maxLen) {
      break
    }
    yield str

    i++
    iterations++

    if (options.to !== undefined && i > options.to) {
      break
    }

    if (
      options.maxIterations !== undefined &&
      iterations >= options.maxIterations
    ) {
      break
    }
  }
}

export default indexedStringVariation
