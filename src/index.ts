export const defaultAlphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function generator(alphabet?: string) {
  // remove duplicates from alphabets
  const cleanAlphabet = (alphabet: string) => {
    return Array.from(new Set(alphabet.split(''))).join('');
  };

  if (alphabet && typeof alphabet !== 'string') {
    throw new TypeError('alphabet must be a string');
  }

  alphabet = alphabet ? cleanAlphabet(alphabet) : defaultAlphabet;

  // string generation function
  const generate = (index: number | bigint) => {
    return typeof index === 'bigint' ? generateBigInt(index, alphabet!) : generateInt(index as number, alphabet!);
  };

  generate.alphabet = alphabet;

  return generate;
}

import generateInt from './generate/generateInt.js';
import generateBigInt from './generate/generateBigInt.js';

export default generator;
