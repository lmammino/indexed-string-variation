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

for (const i=0; i < 23; i++) {
    console.log(i, isvn(i)); // generates the i-th string in the alphabet 'abc1'
}
```

Will print:

```bash
0 
1 a
2 b
3 c
4 1
5 aa
6 ab
7 ac
8 a1
9 ba
10 bb
11 bc
12 b1
13 ca
14 cb
15 cc
16 c1
17 1a
18 1b
19 1c
20 11
21 aaa
```


## Contributing

Everyone is very welcome to contribute to this project.
You can contribute just by submitting bugs or suggesting improvements by
[opening an issue on GitHub](https://github.com/lmammino/indexed-string-variation/issues).


## License

Licensed under [MIT License](LICENSE). © Luciano Mammino.