import { describe, it, expect } from 'vitest';
import { generator, defaultAlphabet } from './index.js';

const cases: [string, string, string[]][] = [
  [
    'it should produce variations with digits in alphabet',
    '0123456789',
    ['', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '01', '02', '03', '04', '05', '06',
      '07', '08', '09', '10']
  ],
  [
    'it should produce variations with alphanumeric alphabet',
    'abc1',
    ['', 'a', 'b', 'c', '1', 'aa', 'ab', 'ac', 'a1', 'ba', 'bb', 'bc', 'b1', 'ca', 'cb', 'cc', 'c1', '1a',
      '1b', '1c', '11', 'aaa']
  ],
  [
    'it should remove duplicates from alphabet',
    'aabbbbcc1111111',
    ['', 'a', 'b', 'c', '1', 'aa', 'ab', 'ac', 'a1', 'ba', 'bb', 'bc', 'b1', 'ca', 'cb', 'cc', 'c1', '1a',
      '1b', '1c', '11', 'aaa']
  ]
];

describe('indexed-string-variation', () => {
  it.each(cases)('%s', (_title: string, alphabet: string, expected: string[]) => {
    const isvn = generator(alphabet);
    const generatedInt: string[] = [];
    const generatedBigInt: string[] = [];
    for (let i = 0; i < expected.length; i++) {
      generatedInt.push(isvn(i));
      generatedBigInt.push(isvn(BigInt(i)));
    }
    expect(generatedInt).toEqual(expected);
    expect(generatedBigInt).toEqual(expected);
  });

  it('it must use the default alphabet if no alphabet is given', () => {
    const g = generator();
    expect(g.alphabet).toBe(defaultAlphabet);
  });
});
