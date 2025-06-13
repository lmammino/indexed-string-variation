# indexed-string-variation

[![npm version](https://badge.fury.io/js/indexed-string-variation.svg)](http://badge.fury.io/js/indexed-string-variation)
[![Build Status](https://travis-ci.org/lmammino/indexed-string-variation.svg?branch=master)](https://travis-ci.org/lmammino/indexed-string-variation)
[![codecov.io](https://codecov.io/gh/lmammino/indexed-string-variation/coverage.svg?branch=master)](https://codecov.io/gh/lmammino/indexed-string-variation)


Experimental JavaScript module to generate all possible variations of strings over an alphabet using an n-ary virtual tree.


## Requirements

- Node.js >= 22

## Install

With NPM:

```bash
npm install indexed-string-variation
```

## Usage

This library is ESM-only and written in TypeScript. You can import it as follows:

```js
import { generator } from 'indexed-string-variation';

const variations = generator('abc1');

for (let i = 0; i < 23; i++) {
  console.log(i, variations(i)); // generates the i-th string in the alphabet 'abc1'
}

// Using BigInt for large indices
console.log(variations(12345678901234567890n));
```

## TypeScript

Type definitions are included. You can use this library with full type safety in TypeScript projects.

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

- The library now uses native JavaScript `BigInt` instead of the `big-integer` dependency.
- Only ESM is supported (no CommonJS `require`).
- Node.js 22 or newer is required.


## License

Licensed under [MIT License](LICENSE). © Luciano Mammino.
