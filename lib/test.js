'use strict';

var _tap = require('tap');

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      var isvn = (0, _index2.default)(alphabet);
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

(0, _tap.test)('it must not accept non-string values as alphabet', function (t) {
  t.plan(1);
  t.throws(function () {
    return (0, _index2.default)([]);
  }, TypeError, 'alphabet must be a string');
});

(0, _tap.test)('it must not accept indexes that are not non-negative integers', function (t) {
  t.plan(2);
  t.throws(function () {
    return (0, _index2.default)('a')(-1);
  }, TypeError, 'index must be a non-negative integer');
  t.throws(function () {
    return (0, _index2.default)('b')({});
  }, TypeError, 'index must be a non-negative integer');
});