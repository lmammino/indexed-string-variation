# indexed-string-variation

[![npm version](https://badge.fury.io/js/indexed-string-variation.svg)](http://badge.fury.io/js/indexed-string-variation)
[![CI](https://github.com/lmammino/indexed-string-variation/actions/workflows/ci.yml/badge.svg)](https://github.com/lmammino/indexed-string-variation/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/lmammino/indexed-string-variation/graph/badge.svg?token=4zplgm5bBj)](https://codecov.io/gh/lmammino/indexed-string-variation)

JavaScript module to generate all possible variations of strings over an
alphabet using an n-ary virtual tree.

## Quick start example:

```js
// generate all strings of max length 3 using the alphabet "ab"
import isv from "indexed-string-variation";

for (const str of isv({ alphabet: "ab", maxLen: 3 })) {
  console.log(str);
}
```

Output:

```plain
(empty string)
a
b
aa
ab
ba
bb
aaa
aab
aba
abb
baa
bab
bba
bbb
```

> [!IMPORTANT]\
> Note that the first result is always an empty string! If you want to start
> from the first non-empty string, you can use the `from` option to specify the
> starting index of `1n`.

## Requirements

- Node.js >= 22

## Install

With NPM:

```bash
npm install indexed-string-variation
```

## Usage

This library is ESM-only and written in TypeScript. You can import and use it as
follows:

```js
import isv from "indexed-string-variation";

// Basic usage: generate all variations for a given alphabet
for (
  const str of isv({ alphabet: "abc1", maxIterations: 23 })
) {
  console.log(str);
}

// Generate variations from a specific index (using BigInt)
for (
  const str of isv({
    alphabet: "abc1",
    from: 20n,
    maxIterations: 5,
  })
) {
  console.log(str);
}

// Generate variations up to a maximum string length
for (const str of isv({ alphabet: "abc1", maxLen: 2 })) {
  console.log(str);
}

// endless variations (don't use a `for ... of` loop because it will never end!)
const values = isv({
  alphabet: "abc1",
});

console.log(values.next()); // { value: 'a', done: false }
console.log(values.next()); // { value: 'b', done: false }
//...
```

### Options

The `isv` generator function accepts options that allow you to configure how the
generation will behave:

- `alphabet`: a `string` containing the characters that will be used to generate
  the variations. The order of the characters in the string defines their
  lexicographic order (defaults to
  `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`).
- `from`: a `bigint`representing the index from which to start generating the
  variations (defaults to `0n`).
- `to?`: a `bigint` representing the index at which to stop generating the
  variations (optional, defaults to `undefined`, which indicates infinity).
- maxLen: a `number` representing the maximum length of the generated strings
  (optional, defaults to `undefined`, which means no limit).
- maxIterations: a `number` representing the maximum number of iterations to run
  (optional, defaults to `undefined`, which means no limit).

> [!IMPORTANT]\
> All the options are optional and by default the generator will be endless (it
> will keep generating variations), so if you use it in a `for ... of` loop it
> will never end unless you have an explicit mechanism to break the loop!
> Alternatively, you can use iterator helpers such as
> [`Iterator.prototype.take`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/take)
> to limit the number of iterations.

## How the algorithm works

The way the generation algorithm work is using an n-ary tree where n is the size
of the alphabet. For example, if we have an alphabet containing only `a`, `b`
and `c`, and we want to generate all the strings with a maximum length of 3 the
algorithm will use the following tree:

![Sample ternary tree over abc alphabet](doc/sample_diagram.png)

The tree is to be considered "virtual", because it's never generated in its
integrity, so the used space in memory is minimal.

In summary, we can describe the algorithm as follows:

> Given an index **i** over an alphabet of length **n**, and it's corresponding
> n-ary tree, the string associated to **i** corresponds to the string obtained
> by concatenating all the characters found in the path that goes from the root
> node to the **i**-th node.
>
> Note that since the library exposes a generator/iterator interface, the value
> of **i** is managed internally be the iterator.

## TypeScript

Type definitions are included. You can use this library with full type safety in
TypeScript projects.

## Testing

This project uses [Vitest](https://vitest.dev/):

```bash
npm test
```

## Development

- Source code is in `src/` (TypeScript)
- Build output is in `dist/`
- Tests are in `src/test.ts`

## Migration notes

- The library now uses native JavaScript `BigInt` instead of the `big-integer`
  dependency.
- Only ESM is supported (no CommonJS `require`).
- Node.js 22 or newer is required.

## License

Licensed under [MIT License](LICENSE). © Luciano Mammino.
