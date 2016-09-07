'use strict';

import {test} from 'tap';
import {generator, defaultAlphabet} from './index';

const dataProvider = {
  'it should produce variations with digits in alphabet': {
    alphabet: '0123456789',
    expected: ['', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '01', '02', '03', '04', '05', '06',
      '07', '08', '09', '10']
  },
  'it should produce variations with alphanumeric alphabet': {
    alphabet: 'abc1',
    expected: ['', 'a', 'b', 'c', '1', 'aa', 'ab', 'ac', 'a1', 'ba', 'bb', 'bc', 'b1', 'ca', 'cb', 'cc', 'c1', '1a',
      '1b', '1c', '11', 'aaa']
  },
  'it should remove duplicates from alphabet': {
    alphabet: 'aabbbbcc1111111',
    expected: ['', 'a', 'b', 'c', '1', 'aa', 'ab', 'ac', 'a1', 'ba', 'bb', 'bc', 'b1', 'ca', 'cb', 'cc', 'c1', '1a',
      '1b', '1c', '11', 'aaa']
  }
};

for (const testCase in dataProvider) {
  if (({}).hasOwnProperty.call(dataProvider, testCase)) {
    test(testCase, t => {
      const alphabet = dataProvider[testCase].alphabet;
      const expected = dataProvider[testCase].expected;
      const isvn = generator(alphabet);
      const generated = [];
      for (let i = 0; i < expected.length; i++) {
        generated.push(isvn(i));
      }
      t.plan(1);
      t.deepEqual(expected, generated, `From ${alphabet} generates: ${expected.join()}`);
    });
  }
}

test('it must use the default alphabet if no alphabet is given', t => {
  t.plan(2);
  const g = generator();
  t.equal('d', g(4));
  t.equal(g.alphabet, defaultAlphabet);
});

test('it must not accept non-string values as alphabet', t => {
  t.plan(3);
  const expectedException = TypeError;
  const expectedMessage = 'alphabet must be a string';
  t.throws(() => generator(-1), expectedException, expectedMessage);
  t.throws(() => generator([]), expectedException, expectedMessage);
  t.throws(() => generator({}), expectedException, expectedMessage);
});

test('it must not accept indexes that are not non-negative integers', t => {
  t.plan(3);
  const expectedException = TypeError;
  const expectedMessage = 'index must be a non-negative integer';
  t.throws(() => generator('a')(-1), expectedException, expectedMessage);
  t.throws(() => generator('a')([]), expectedException, expectedMessage);
  t.throws(() => generator('b')({}), expectedException, expectedMessage);
});
