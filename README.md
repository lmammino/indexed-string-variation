# indexed-string-variation

[![npm version](https://badge.fury.io/js/indexed-string-variation.svg)](http://badge.fury.io/js/indexed-string-variation)
[![Build Status](https://travis-ci.org/lmammino/indexed-string-variation.svg?branch=master)](https://travis-ci.org/lmammino/indexed-string-variation)
[![codecov.io](https://codecov.io/gh/lmammino/indexed-string-variation/coverage.svg?branch=master)](https://codecov.io/gh/lmammino/indexed-string-variation)


Experimental JavaScript module to generate all possible variations of strings over an alphabet using an n-ary virtual tree.


## Install

With NPM:

```bash
npm install --save indexed-string-variation
```


## Usage

Generally useful to create distributed brute-force password recovery tools or
other software that might require distributed generation of all possible
strings on a given alphabet.

```javascript
const generator = require('indexed-string-variation').generator;
const variations = generator('abc1');

for (let i=0; i < 23; i++) {
    console.log(i, variations(i)); // generates the i-th string in the alphabet 'abc1'
}
```

Will print:

```bash
0 ''
1 'a'
2 'b'
3 'c'
4 '1'
5 'aa'
6 'ab'
7 'ac'
8 'a1'
9 'ba'
10 'bb'
11 'bc'
12 'b1'
13 'ca'
14 'cb'
15 'cc'
16 'c1'
17 '1a'
18 '1b'
19 '1c'
20 '11'
21 'aaa'
22 'aab'
```


## API

The module `indexed-string-variation` exposes the following components:
 
 * `generator` (also aliased as `default` for ES2015 modules): the 
  main generator function
 * `defaultAlphabet`: a constant string that contains the sequence of 
  characters in the defaultAlphabet

As you can see in the [usage example](#usage), the `generator` function takes as input the 
alphabet string (which is optional and it will default to `defaultAlphabet` if 
not provided) and returns a new function called `variations` which can be
used to retrieve the indexed variation on the given alphabet. `variations` takes
a non-negative integer as input which represents the index of the variations
that we want to generate:

```javascript
const variations = generator('XYZ');
console.log(variations(7123456789)); // "XYYZYZZZYYYZYZYXYYYYX"
```


## How the algorithm works

The way the generation algorithm work is using an n-ary tree where n is the size of the alphabet.
For example, if we have an alphabet containing only `a`, `b` and `c` and we want to generate all
the strings with a maximum length of 3 the algorithm will use the following tree:

![Sample ternary tree over abc alphabet](doc/sample_diagram.png)

The tree is to be considered "virtual", because it's never generated in its integrity, so the
used space in memory is minimal.

In brevity we can describe the algorithm as follows:

*Given an index **i** over an alphabet of length **n** and it's corresponding n-ary tree,
the string associated to **i** corresponds to the string obtained by 
concatenating all the characters found from the root node to the node **i**.*

For example, with the alphabet in the image we can generate the following strings:

| i | generated string |
|---:|---|
|0||
|1|a|
|2|b|
|3|c|
|4|aa|
|5|ab|
|6|ac|
|7|ba|
|8|bb|
|9|bc|
|10|ca|
|11|cb|
|12|cc|


Important note: The alphabet is always normalized (i.e. duplicates are removed)


## Use big-integer to avoid JavaScript big integers approximations

Integers with more than 18 digits are approximated (e.g. `123456789012345680000 === 123456789012345678901`), so at some 
point the generator will start to generate a lot of duplicated strings and it will start to miss many cases.

To workaround this issue you can use indexes generated with the module [big-integer](https://www.npmjs.com/package/big-integer).
Internally the indexed-string-variation will take care of performing the correct
operations using the library.

Let's see an example:

```javascript
const bigInt = require('big-integer'); // install from https://npmjs.com/package/big-integer
const generator = require('indexed-string-variation').generator;
const variations = generator('JKWXYZ');

// generation using regular big numbers (same result)
console.log(variations(123456789012345678901)); // XJZJYXXXYYJKYZZJKZKYJWJJYW
console.log(variations(123456789012345680000)); // XJZJYXXXYYJKYZZJKZKYJWJJYW

// generation using big-integer numbers (correct results)
console.log(variations(bigInt('123456789012345678901'))); // XJZJYXXXYYJKYZZJKZKXZKJZZJ
console.log(variations(bigInt('123456789012345680000'))); // XJZJYXXXYYJKYZZJKZKXZWJJWK
```

Anyway, keep in mind that big-integers might have a relevant performance impact, 
so if you don't plan to use huge integers it's still recommended to use 
plain JavaScript numbers as indexes.


## Contributing

Everyone is very welcome to contribute to this project.
You can contribute just by submitting bugs or suggesting improvements by
[opening an issue on GitHub](https://github.com/lmammino/indexed-string-variation/issues).


## License

Licensed under [MIT License](LICENSE). © Luciano Mammino.
