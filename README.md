# TypedNumbers - WIP!

## About

I've made this library while building a little Intel 8080 emulator in JavaScript.
I noticed the lack of typed numbers in JavaScript, and how useful they could be, and then made this idea into a whole library!  

## Naming scheme

The library uses the naming scheme from Rust.  
So u8, u16, u32, u64, i8, i16, i32, i64, f32, f64.

If you want to use another naming scheme just rename the types at import.  
For example:
```typescript
import { i8 as int8 } from 'typed-numbers';
```
or:
```typescript
import { i8 as byte } from 'typed-numbers';
```
