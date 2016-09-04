# indexed-string-variation

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
    console.log(isvn(i)); // generates the i-th string in the alphabet 'abc1'
}
```

Will print:

```bash
a
b
c
1
aa
ab
ac
a1
ba
bb
bc
b1
ca
cb
cc
c1
1a
1b
1c
11
aaa
```


## Contributing

Everyone is very welcome to contribute to this project.
You can contribute just by submitting bugs or suggesting improvements by
[opening an issue on GitHub](https://github.com/lmammino/indexed-string-variation/issues).


## License

Licensed under [MIT License](LICENSE). © Luciano Mammino.