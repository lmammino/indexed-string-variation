import { describe, expect, it } from 'vitest'
import { defaultAlphabet, generator } from './index.js'

const cases: [string, string, string[]][] = [
  [
    'it should produce variations with digits in alphabet',
    '0123456789',
    [
      '',
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '00',
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
    ],
  ],
  [
    'it should produce variations with alphanumeric alphabet',
    'abc1',
    [
      '',
      'a',
      'b',
      'c',
      '1',
      'aa',
      'ab',
      'ac',
      'a1',
      'ba',
      'bb',
      'bc',
      'b1',
      'ca',
      'cb',
      'cc',
      'c1',
      '1a',
      '1b',
      '1c',
      '11',
      'aaa',
    ],
  ],
  [
    'it should remove duplicates from alphabet',
    'aabbbbcc1111111',
    [
      '',
      'a',
      'b',
      'c',
      '1',
      'aa',
      'ab',
      'ac',
      'a1',
      'ba',
      'bb',
      'bc',
      'b1',
      'ca',
      'cb',
      'cc',
      'c1',
      '1a',
      '1b',
      '1c',
      '11',
      'aaa',
    ],
  ],
]

describe('indexed-string-variation', () => {
  it.each(cases)(
    '%s',
    (_title: string, alphabet: string, expected: string[]) => {
      const isvn = generator(alphabet)
      const generatedInt: string[] = []
      const generatedBigInt: string[] = []
      for (let i = 0; i < expected.length; i++) {
        generatedInt.push(isvn(i))
        generatedBigInt.push(isvn(BigInt(i)))
      }
      expect(generatedInt).toEqual(expected)
      expect(generatedBigInt).toEqual(expected)
    },
  )

  it('it must use the default alphabet if no alphabet is given', () => {
    const g = generator()
    expect(g.alphabet).toBe(defaultAlphabet)
  })

  it('throws TypeError for invalid integer indices', () => {
    const isvn = generator('abc')
    // Not an integer
    expect(() => isvn(1.5)).toThrow(TypeError)
    expect(() => isvn(Number.NaN)).toThrow(TypeError)
    expect(() => isvn(Number.POSITIVE_INFINITY)).toThrow(TypeError)
    // Negative number
    expect(() => isvn(-1)).toThrow(TypeError)
    // Negative BigInt
    expect(() => isvn(BigInt(-1))).toThrow(TypeError)
    // Not a number or bigint
    expect(() => isvn('foo' as unknown as number)).toThrow(TypeError)
  })

  it('throws TypeError if an invalid alphabet is passed', () => {
    expect(() => generator(123 as unknown as string)).toThrow(TypeError)
    expect(() => generator({} as unknown as string)).toThrow(TypeError)
    expect(() => generator([] as unknown as string)).toThrow(TypeError)
    expect(() => generator(null as unknown as string)).toThrow(TypeError)
    expect(() => generator(undefined)).not.toThrow() // undefined is allowed (will use the default alphabet)
  })
})
