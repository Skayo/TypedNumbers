# TypedNumbers - WIP!

## About

You can think of the typed numbers as a mix of [typed arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) 
and [DataView](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView).  
It's not a drop in replacement for the in-built [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
or [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) type, 
but more of an [ArrayBuffer view](https://developer.mozilla.org/en-US/docs/Web/API/ArrayBufferView).
(Unfortunately I didn't manage to get `ArrayBuffer.isView(...)` to return true on a typed number. Maybe I'll figure it out one day....)

I've made this library while building a little Intel 8080 emulator in JavaScript.
I noticed the lack of typed numbers in JavaScript, and how useful they could be, and then made this idea into a whole library!  
At first I wanted to write this library in Rust, using [Neon bindings](https://neon-bindings.com/),
but I'm still an absolute noob, therefore I just wrote it using the familiar JavaScript.  
Maybe one day I'll come back to this and rewrite it in Rust. Or someone will make a PR 👀
