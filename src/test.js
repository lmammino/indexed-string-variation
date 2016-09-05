'use strict';

import {test} from 'tap';
import isv from './index';

const dataProvider = {
  'numerical': {
    alphabet: '0123456789',
    expected: ['', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '01', '02', '03', '04', '05', '06',
      '07', '08', '09', '10']
  },
  'alphanumeric': {
    alphabet: 'abc1',
    expected: ['', 'a', 'b', 'c', '1', 'aa', 'ab', 'ac', 'a1', 'ba', 'bb', 'bc', 'b1', 'ca', 'cb', 'cc', 'c1', '1a',
      '1b', '1c', '11', 'aaa']
  },
  'with duplicates': {
    alphabet: 'aabbbbcc1111111',
    expected: ['', 'a', 'b', 'c', '1', 'aa', 'ab', 'ac', 'a1', 'ba', 'bb', 'bc', 'b1', 'ca', 'cb', 'cc', 'c1', '1a',
      '1b', '1c', '11', 'aaa']
  }
};

for (const testCase in dataProvider) {
  test(testCase, (t) => {
    const alphabet = dataProvider[testCase].alphabet;
    const expected = dataProvider[testCase].expected;
    const isvn = isv(alphabet);
    const generated = [];
    for (let i = 0; i < expected.length; i++) {
      generated.push(isvn(i));
    }
    t.plan(1);
    t.deepEqual(expected, generated, `From ${alphabet} generates: ${expected.join()}`);
  });
}
