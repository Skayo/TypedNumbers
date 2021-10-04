<h1 align="center">TypedNumbers</h1>
<p align="center">Super simple type-safe fixed-length integers for TypeScript/JavaScript</p>
<p align="center">
  <a href="https://npmjs.com/package/typed-numbers"><img src="https://img.shields.io/npm/v/typed-numbers?style=for-the-badge" alt="NPM VERSION"></a>
  <a href="https://npmjs.com/package/typed-numbers"><img src="https://img.shields.io/npm/dt/typed-numbers?style=for-the-badge" alt="NPM DOWNLOADS"></a>
  <a href="https://npmjs.com/package/typed-numbers"><img src="https://img.shields.io/librariesio/release/npm/typed-numbers?style=for-the-badge" alt="DEPENDENCIES"></a>
</p>
<p align="center">
  <a href="#about">About</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#resources">Resources</a> •
  <a href="#license">License</a>
</p>

## About

I've made this library while building a little Intel 8080 emulator in JavaScript.  
I noticed the lack of typed numbers in JavaScript, and how useful they could be, and then made this idea into a whole library!

## Installation

```sh-session
With npm:
$ npm install typed-numbers

With pnpm (recommended):
$ pnpm install typed-numbers

With yarn:
$ yarn add typed-numbers
```
or you can directly add it to your website via [unpkg](https://unpkg.com/):
```html
<script src="https://unpkg.com/typed-numbers"></script>
```

## Usage

> If this project gains more attention I'll add some documentation!

```typescript
import { u8, u16 } from 'typed-numbers';

// Function that takes only 16-bit unsigned integers:
function getFirstByte(num: u16): u8 {
	return u8(num & 0xf);
}

getFirstByte(127); // -> ERROR!
getFirstByte(u8(127)); // -> ERROR!
getFirstByte(u16(127)); // -> 15


// Define a 8-bit unsigned integer:
const num = u8(255);

// Add 1 (wrapped addition)
num = u8(num + 1);

// Output result
console.log(num); // -> 0
```

## Naming scheme

The library uses the fixed-length integer naming scheme from Rust.  
If you want to use another naming scheme just rename the types at import:
```typescript
import { i8 as int8 } from 'typed-numbers';
```
or:
```typescript
import { i8 as byte } from 'typed-numbers';
```


## License

[MIT License](https://github.com/Skayo/TypedNumbers/blob/main/LICENSE)
