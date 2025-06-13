# indexed-string-variation

[![npm version](https://badge.fury.io/js/indexed-string-variation.svg)](http://badge.fury.io/js/indexed-string-variation)


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
import { generator } from 'indexed-string-variation';
// Alternatively, you can use the default import:
// import generator from 'indexed-string-variation';

const variations = generator('abc1');

for (let i = 0; i < 23; i++) {
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

* `generator`: The main generator function. It is exported as both a named export and the default export.
  So you can import it as `import { generator } from 'indexed-string-variation';` or `import generator from 'indexed-string-variation';`.
* `defaultAlphabet`: A constant string that contains the sequence of characters in the default alphabet (`abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`).

As you can see in the [usage example](#usage), the `generator` function takes an optional alphabet string as input (it will default to `defaultAlphabet` if not provided). It returns a new function, let's call it `generateVariation`, which can be used to retrieve the indexed variation on the given alphabet.

The `generateVariation` function takes a non-negative integer or a `BigInt` as input, representing the index of the variation to generate:

```javascript
import { generator } from 'indexed-string-variation';

const generateVariation = generator('XYZ');
console.log(generateVariation(123)); // Example output for a small index
// For very large indices, see the section "Working with Large Indices (Native BigInt)"
```

## Working with Large Indices (Native BigInt)

JavaScript integers have limitations for very large numbers (typically numbers greater than 2<sup>53</sup> - 1, or `Number.MAX_SAFE_INTEGER`). For indices exceeding this limit, this library seamlessly supports native JavaScript `BigInt` values.

To use `BigInt`, simply append `n` to your number or use the `BigInt()` constructor.

```javascript
import { generator } from 'indexed-string-variation';
const variations = generator('JKWXYZ');

// For very large numbers, use BigInt
console.log(variations(123456789012345678901n));
// Note the 'n' suffix for BigInt literals
```

This ensures precision when dealing with extremely large variation indices.


## How the algorithm works

The way the generation algorithm work is using an n-ary tree where n is the size of the alphabet.
For example, if we have an alphabet containing only `a`, `b` and `c` and we want to generate all
the strings with a maximum length of 3 the algorithm will use the following tree:

![Sample ternary tree over abc alphabet](doc/sample_diagram.png)

The tree is to be considered "virtual", because it's never generated in its integrity, so the
used space in memory is minimal.

In brevity we can describe the algorithm as follows:

> Given an index **i** over an alphabet of length **n** and it's corresponding n-ary tree,
the string associated to **i** corresponds to the string obtained by 
concatenating all the characters found in the path that goes from the root node to the **i**-th node.

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


## Contributing

Everyone is very welcome to contribute to this project.
You can contribute just by submitting bugs or suggesting improvements by
[opening an issue on GitHub](https://github.com/lmammino/indexed-string-variation/issues).


## License

Licensed under [MIT License](LICENSE). © Luciano Mammino.
