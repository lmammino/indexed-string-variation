import generateInt from './generate/generateInt'; // .js is removed, resolves to .ts
import generateBigInt from './generate/generateBigInt'; // .js is removed, resolves to .ts

export const defaultAlphabet: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

// Define a type for the generate function that also has an alphabet property
type GenerateFunction = {
  (index: number | bigint): string;
  alphabet: string;
};

export function generator(alphabet?: string): GenerateFunction {
  // remove duplicates from alphabets
  const cleanAlphabet = (alpha: string): string => {
    return alpha
      .split('')
      .filter((item, pos, self) => self.indexOf(item) === pos)
      .join('')
    ;
  };

  if (alphabet && typeof alphabet !== 'string') {
    throw new TypeError('alphabet must be a string');
  }

  const currentAlphabet: string = alphabet ? cleanAlphabet(alphabet) : defaultAlphabet;

  // string generation function
  const generate: GenerateFunction = ((index: number | bigint): string => {
    return typeof index === 'bigint' ? generateBigInt(index, currentAlphabet) : generateInt(index, currentAlphabet);
  }) as GenerateFunction;

  generate.alphabet = currentAlphabet;

  return generate;
}

export default generator;
