'use strict';

import bigInt from 'big-integer';
import generateInt from './generate/generateInt';
import generateBigInt from './generate/generateBigInt';

export const defaultAlphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
export function generator(alphabet) {
  // remove duplicates from alphabets
  const cleanAlphabet = alphabet => {
    return alphabet
      .split('')
      .filter((item, pos, self) => self.indexOf(item) === pos)
      .join('')
    ;
  };

  if (alphabet && typeof alphabet !== 'string') {
    throw new TypeError('alphabet must be a string');
  }

  alphabet = alphabet ? cleanAlphabet(alphabet) : defaultAlphabet;

  // string generation function
  const generate = index => {
    return index instanceof bigInt ? generateBigInt(index, alphabet) : generateInt(index, alphabet);
  };

  generate.alphabet = alphabet;

  return generate;
}

export default generator;
