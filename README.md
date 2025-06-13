# indexed-string-variation

[![npm version](https://badge.fury.io/js/indexed-string-variation.svg)](http://badge.fury.io/js/indexed-string-variation)
[![Build Status](https://travis-ci.org/lmammino/indexed-string-variation.svg?branch=master)](https://travis-ci.org/lmammino/indexed-string-variation)
[![codecov.io](https://codecov.io/gh/lmammino/indexed-string-variation/coverage.svg?branch=master)](https://codecov.io/gh/lmammino/indexed-string-variation)

Experimental JavaScript module to generate all possible variations of strings
over an alphabet using an n-ary virtual tree.

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
