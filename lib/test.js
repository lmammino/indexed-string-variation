'use strict';

var _tap = require('tap');

var _index = require('./index');

var dataProvider = {
  'it should produce variations with digits in alphabet': {
    alphabet: '0123456789',
    expected: ['', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10']
  },
  'it should produce variations with alphanumeric alphabet': {
    alphabet: 'abc1',
    expected: ['', 'a', 'b', 'c', '1', 'aa', 'ab', 'ac', 'a1', 'ba', 'bb', 'bc', 'b1', 'ca', 'cb', 'cc', 'c1', '1a', '1b', '1c', '11', 'aaa']
  },
  'it should remove duplicates from alphabet': {
    alphabet: 'aabbbbcc1111111',
    expected: ['', 'a', 'b', 'c', '1', 'aa', 'ab', 'ac', 'a1', 'ba', 'bb', 'bc', 'b1', 'ca', 'cb', 'cc', 'c1', '1a', '1b', '1c', '11', 'aaa']
  }
};

var _loop = function _loop(testCase) {
  if ({}.hasOwnProperty.call(dataProvider, testCase)) {
    (0, _tap.test)(testCase, function (t) {
      var alphabet = dataProvider[testCase].alphabet;
      var expected = dataProvider[testCase].expected;
      var isvn = (0, _index.generator)(alphabet);
      var generated = [];
      for (var i = 0; i < expected.length; i++) {
        generated.push(isvn(i));
      }
      t.plan(1);
      t.deepEqual(expected, generated, 'From ' + alphabet + ' generates: ' + expected.join());
    });
  }
};

for (var testCase in dataProvider) {
  _loop(testCase);
}

(0, _tap.test)('it must use the default alphabet if no alphabet is given', function (t) {
  t.plan(2);
  var g = (0, _index.generator)();
  t.equal('d', g(4));
  t.equal(g.alphabet, _index.defaultAlphabet);
});

(0, _tap.test)('it must not accept non-string values as alphabet', function (t) {
  t.plan(3);
  var expectedException = TypeError;
  var expectedMessage = 'alphabet must be a string';
  t.throws(function () {
    return (0, _index.generator)(-1);
  }, expectedException, expectedMessage);
  t.throws(function () {
    return (0, _index.generator)([]);
  }, expectedException, expectedMessage);
  t.throws(function () {
    return (0, _index.generator)({});
  }, expectedException, expectedMessage);
});

(0, _tap.test)('it must not accept indexes that are not non-negative integers', function (t) {
  t.plan(3);
  var expectedException = TypeError;
  var expectedMessage = 'index must be a non-negative integer';
  t.throws(function () {
    return (0, _index.generator)('a')(-1);
  }, expectedException, expectedMessage);
  t.throws(function () {
    return (0, _index.generator)('a')([]);
  }, expectedException, expectedMessage);
  t.throws(function () {
    return (0, _index.generator)('b')({});
  }, expectedException, expectedMessage);
});