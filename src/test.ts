import { describe, expect, it } from 'vitest'
import { type GenOptions, indexedStringVariation } from './index.js'

const cases: [string, GenOptions, string[]][] = [
  [
    'it should produce variations with digits in alphabet',
    { alphabet: '0123456789', from: 0n, to: 21n },
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
    { alphabet: 'abc1', from: 0n, to: 21n },
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
    { alphabet: 'aabbbbcc1111111', from: 0n, to: 21n },
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
    'it uses the default alphabet if none is provided',
    { from: 0n, to: 10n },
    ['', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
  ],
  [
    'it stops at maxLen if provided',
    { alphabet: 'ab', maxLen: 2 },
    ['', 'a', 'b', 'aa', 'ab', 'ba', 'bb'],
  ],
  [
    'it stops at maxIterations if provided',
    { alphabet: 'ab', maxIterations: 5 },
    ['', 'a', 'b', 'aa', 'ab'],
  ],
]

describe('indexed-string-variation', () => {
  it.each(cases)(
    '%s',
    (_title: string, options: GenOptions, expected: string[]) => {
      const isvn = indexedStringVariation(options)
      const generatedStrings = [...isvn]
      expect(generatedStrings).toEqual(expected)
    },
  )

  it('Can be used with the explicit iterator interface', () => {
    // endless
    const isvn = indexedStringVariation({ alphabet: 'ab' })
    expect(isvn.next()).toEqual({ value: '', done: false })
    expect(isvn.next()).toEqual({ value: 'a', done: false })
    expect(isvn.next()).toEqual({ value: 'b', done: false })
    expect(isvn.next()).toEqual({ value: 'aa', done: false })
    expect(isvn.next()).toEqual({ value: 'ab', done: false })
    expect(isvn.next()).toEqual({ value: 'ba', done: false })
    expect(isvn.next()).toEqual({ value: 'bb', done: false })
    //...
  })
})
