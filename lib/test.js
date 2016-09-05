'use strict';

var _tap = require('tap');

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dataProvider = {
  'numerical': {
    alphabet: '0123456789',
    expected: ['', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10']
  },
  'alphanumeric': {
    alphabet: 'abc1',
    expected: ['', 'a', 'b', 'c', '1', 'aa', 'ab', 'ac', 'a1', 'ba', 'bb', 'bc', 'b1', 'ca', 'cb', 'cc', 'c1', '1a', '1b', '1c', '11', 'aaa']
  },
  'with duplicates': {
    alphabet: 'aabbbbcc1111111',
    expected: ['', 'a', 'b', 'c', '1', 'aa', 'ab', 'ac', 'a1', 'ba', 'bb', 'bc', 'b1', 'ca', 'cb', 'cc', 'c1', '1a', '1b', '1c', '11', 'aaa']
  }
};

var _loop = function _loop(testCase) {
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
};

for (var testCase in dataProvider) {
  _loop(testCase);
}