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
const isv = require('indexed-string-variation');
const isvn = isv('abc1');

for (let i=0; i < 23; i++) {
    console.log(i, isvn(i)); // generates the i-th string in the alphabet 'abc1'
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
  

## Contributing

Everyone is very welcome to contribute to this project.
You can contribute just by submitting bugs or suggesting improvements by
[opening an issue on GitHub](https://github.com/lmammino/indexed-string-variation/issues).


## License

Licensed under [MIT License](LICENSE). © Luciano Mammino.
