# indexed-string-variation

[![npm version](https://badge.fury.io/js/indexed-string-variation.svg)](http://badge.fury.io/js/indexed-string-variation)
[![CI](https://github.com/lmammino/indexed-string-variation/actions/workflows/ci.yml/badge.svg)](https://github.com/lmammino/indexed-string-variation/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/lmammino/indexed-string-variation/graph/badge.svg?token=4zplgm5bBj)](https://codecov.io/gh/lmammino/indexed-string-variation)

JavaScript module to generate all possible variations of strings over an
alphabet using an n-ary virtual tree.

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
