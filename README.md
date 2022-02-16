<!--

@license Apache-2.0

Copyright (c) 2018 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->

# Chi Random Numbers

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Create a [readable stream][readable-stream] for generating pseudorandom numbers drawn from a [chi][chi] distribution.

<section class="installation">

## Installation

```bash
npm install @stdlib/random-streams-chi
```

Alternatively,

-   To load the package in a website via a `script` tag without installation and bundlers, use the [ES Module][es-module] available on the [`esm` branch][esm-url].
-   If you are using Deno, visit the [`deno` branch][deno-url].
-   For use in Observable, or in browser/node environments, use the [Universal Module Definition (UMD)][umd] build available on the [`umd` branch][umd-url].

</section>

<section class="usage">

## Usage

```javascript
var randomStream = require( '@stdlib/random-streams-chi' );
```

<a name="random-stream"></a>

#### randomStream( k\[, options] )

Returns a [readable stream][readable-stream] for generating pseudorandom numbers drawn from a [chi][chi] distribution with degrees of freedom `k`.

```javascript
var inspectStream = require( '@stdlib/streams-node-inspect-sink' );

var iStream;
var stream;

function log( chunk, idx ) {
    console.log( chunk.toString() );
    if ( idx === 10 ) {
        stream.destroy();
    }
}

stream = randomStream( 2.0 );
iStream = inspectStream( log );

stream.pipe( iStream );
```

The function accepts the following `options`:

-   **objectMode**: specifies whether a [stream][stream] should operate in [objectMode][object-mode]. Default: `false`.
-   **encoding**: specifies how `Buffer` objects should be decoded to `strings`. Default: `null`.
-   **highWaterMark**: specifies the maximum number of bytes to store in an internal buffer before ceasing to generate additional pseudorandom numbers.
-   **sep**: separator used to join streamed data. This option is only applicable when a stream is **not** in [objectMode][object-mode]. Default: `'\n'`.
-   **iter**: number of iterations.
-   **prng**: pseudorandom number generator for generating uniformly distributed pseudorandom numbers on the interval `[0,1)`. If provided, the function **ignores** both the `state` and `seed` options. In order to seed the returned pseudorandom number generator stream, one must seed the provided `prng` (assuming the provided `prng` is seedable).
-   **seed**: pseudorandom number generator seed.
-   **state**: a [`Uint32Array`][@stdlib/array/uint32] containing pseudorandom number generator state. If provided, the function ignores the `seed` option.
-   **copy**: `boolean` indicating whether to copy a provided pseudorandom number generator state. Setting this option to `false` allows sharing state between two or more pseudorandom number generators and/or streams. Setting this option to `true` ensures that a stream generator has exclusive control over its internal state. Default: `true`.
-   **siter**: number of iterations after which to emit the pseudorandom number generator state. This option is useful when wanting to deterministically capture a stream's underlying PRNG state. Default: `1e308`.

To set [stream][stream] `options`,

```javascript
var opts = {
    'objectMode': true,
    'encoding': 'utf8',
    'highWaterMark': 64
};

var stream = randomStream( 2.0, opts );
```

By default, the function returns a [stream][stream] which can generate an infinite number of values (i.e., the [stream][stream] will **never** end). To limit the number of generated pseudorandom numbers, set the `iter` option.

```javascript
var inspectStream = require( '@stdlib/streams-node-inspect-sink' );

function log( chunk ) {
    console.log( chunk.toString() );
}

var opts = {
    'iter': 10
};

var stream = randomStream( 1.0, opts );
var iStream = inspectStream( log );

stream.pipe( iStream );
```

By default, when not operating in [objectMode][object-mode], a returned [stream][stream] delineates generated pseudorandom numbers using a newline character. To specify an alternative separator, set the `sep` option.

```javascript
var inspectStream = require( '@stdlib/streams-node-inspect-sink' );

function log( chunk ) {
    console.log( chunk.toString() );
}

var opts = {
    'iter': 10,
    'sep': ','
};

var stream = randomStream( 1.0, opts );
var iStream = inspectStream( log );

stream.pipe( iStream );
```

To seed the underlying pseudorandom number generator, set the `seed` option.

```javascript
var inspectStream = require( '@stdlib/streams-node-inspect-sink' );

function log( v ) {
    console.log( v );
}

var opts = {
    'objectMode': true,
    'iter': 10,
    'seed': 1234
};

var stream = randomStream( 1.0, opts );

opts = {
    'objectMode': true
};
var iStream = inspectStream( opts, log );

stream.pipe( iStream );
```

To return a [readable stream][readable-stream] with an underlying pseudorandom number generator having a specific initial state, set the `state` option.

```javascript
var inspectStream = require( '@stdlib/streams-node-inspect-sink' );

function log( v ) {
    console.log( v );
}

var opts1 = {
    'objectMode': true,
    'iter': 10
};

var stream = randomStream( 2.0, opts1 );

var opts2 = {
    'objectMode': true
};
var iStream = inspectStream( opts2, log );

// Stream pseudorandom numbers, thus progressing the underlying generator state:
stream.pipe( iStream );

// Create a new PRNG stream initialized to the last state of the previous stream:
var opts3 = {
    'objectMode': true,
    'iter': 10,
    'state': stream.state
};

stream = randomStream( 2.0, opts3 );
iStream = inspectStream( opts2, log );

// Stream pseudorandom numbers starting from the last state of the previous stream:
stream.pipe( iStream );
```

##### stream.PRNG

The underlying pseudorandom number generator.

```javascript
var stream = randomStream( 2.0 );

var prng = stream.PRNG;
// returns <Function>
```

##### stream.seed

The value used to seed the underlying pseudorandom number generator.

```javascript
var stream = randomStream( 2.0 );

var seed = stream.seed;
// returns <Uint32Array>
```

If provided a PRNG for uniformly distributed numbers, this value is `null`.

```javascript
var minstd = require( '@stdlib/random-base-minstd-shuffle' ).normalized;

var stream = randomStream( 2.0, {
    'prng': minstd
});

var seed = stream.seed;
// returns null
```

##### stream.seedLength

Length of underlying pseudorandom number generator seed.

```javascript
var stream = randomStream( 2.0 );

var len = stream.seedLength;
// returns <number>
```

If provided a PRNG for uniformly distributed numbers, this value is `null`.

```javascript
var minstd = require( '@stdlib/random-base-minstd-shuffle' ).normalized;

var stream = randomStream( 2.0, {
    'prng': minstd
});

var len = stream.seedLength;
// returns null
```

##### stream.state

Writable property for getting and setting the underlying pseudorandom number generator state.

```javascript
var stream = randomStream( 2.0 );

var state = stream.state;
// returns <Uint32Array>
```

If provided a PRNG for uniformly distributed numbers, this value is `null`.

```javascript
var minstd = require( '@stdlib/random-base-minstd-shuffle' ).normalized;

var stream = randomStream( 2.0, {
    'prng': minstd
});

var state = stream.state;
// returns null
```

##### stream.stateLength

Length of underlying pseudorandom number generator state.

```javascript
var stream = randomStream( 2.0 );

var len = stream.stateLength;
// returns <number>
```

If provided a PRNG for uniformly distributed numbers, this value is `null`.

```javascript
var minstd = require( '@stdlib/random-base-minstd-shuffle' ).normalized;

var stream = randomStream( 2.0, {
    'prng': minstd
});

var len = stream.stateLength;
// returns null
```

##### stream.byteLength

Size (in bytes) of underlying pseudorandom number generator state.

```javascript
var stream = randomStream( 2.0 );

var sz = stream.byteLength;
// returns <number>
```

If provided a PRNG for uniformly distributed numbers, this value is `null`.

```javascript
var minstd = require( '@stdlib/random-base-minstd-shuffle' ).normalized;

var stream = randomStream( 2.0, {
    'prng': minstd
});

var sz = stream.byteLength;
// returns null
```

* * *

#### randomStream.factory( \[k, ]\[options] )

Returns a `function` for creating [readable streams][readable-stream] which generate pseudorandom numbers drawn from a [chi][chi] distribution.

```javascript
var opts = {
    'objectMode': true,
    'encoding': 'utf8',
    'highWaterMark': 64
};

var createStream = randomStream.factory( opts );
```

If provided distribution parameters, the returned function returns [readable streams][readable-stream] which generate pseudorandom numbers drawn from the specified distribution.

```javascript
var createStream = randomStream.factory( 2.0 );

var stream1 = createStream();
var stream2 = createStream();
// ...
```

If not provided distribution parameters, the returned function requires that distribution parameters be provided at each invocation.

```javascript
var createStream = randomStream.factory();

var stream1 = createStream( 2.0 );
var stream2 = createStream( 2.0 );
// ...
```

The method accepts the same `options` as [`randomStream()`](#random-stream).

* * *

#### randomStream.objectMode( k\[, options] )

This method is a convenience function to create [streams][stream] which **always** operate in [objectMode][object-mode].

```javascript
var inspectStream = require( '@stdlib/streams-node-inspect-sink' );

function log( v ) {
    console.log( v );
}

var opts = {
    'iter': 10
};
var stream = randomStream.objectMode( 2.0, opts );

opts = {
    'objectMode': true
};
var iStream = inspectStream( opts, log );

stream.pipe( iStream );
```

This method accepts the same `options` as [`randomStream()`](#random-stream); however, the method will **always** override the [`objectMode`][object-mode] option in `options`.

* * *

### Events

In addition to the standard [readable stream][readable-stream] events, the following events are supported...

#### 'state'

Emitted after internally generating `siter` pseudorandom numbers.

```javascript
var opts = {
    'siter': 10 // emit the PRNG state every 10 pseudorandom numbers
};

var stream = randomStream( 2.0, opts );

stream.on( 'state', onState );

function onState( state ) {
    // Do something with the emitted state, such as save to file...
}
```

</section>

<!-- /.usage -->

* * *

<section class="notes">

## Notes

-   If PRNG state is "shared" (meaning a state array was provided during stream creation and **not** copied) and one sets the generator state to a state array having a different length, the underlying PRNG does **not** update the existing shared state and, instead, points to the newly provided state array. In order to synchronize PRNG output according to the new shared state array, the state array for **each** relevant PRNG must be **explicitly** set.
-   If PRNG state is "shared" and one sets the generator state to a state array of the same length, the PRNG state is updated (along with the state of all other PRNGs sharing the PRNG's state array).
-   In order to capture the PRNG state after a specific number of generated pseudorandom numbers, regardless of internal stream buffering, use the `siter` option in conjunction with a `state` event listener. Attempting to capture the underlying PRNG state after **reading** generated numbers is **not** likely to give expected results, as internal stream buffering will mean more values have been generated than have been read. Thus, the state returned by the `state` property will likely reflect a future PRNG state from the perspective of downstream consumers.

</section>

<!-- /.notes -->

* * *

<section class="examples">

## Examples

<!-- eslint no-undef: "error" -->

```javascript
var inspectStream = require( '@stdlib/streams-node-inspect-sink' );
var randomStream = require( '@stdlib/random-streams-chi' );

function log( v ) {
    console.log( v.toString() );
}

var opts = {
    'objectMode': true,
    'iter': 10
};

var stream = randomStream( 2.0, opts );

opts = {
    'objectMode': true
};
var iStream = inspectStream( opts, log );

stream.pipe( iStream );
```

</section>

<!-- /.examples -->

<!-- Section for describing a command-line interface. -->

* * *

<section class="cli">

## CLI

<section class="installation">

## Installation

To use the module as a general utility, install the module globally

```bash
npm install -g @stdlib/random-streams-chi
```

</section>
<!-- CLI usage documentation. -->


<section class="usage">

### Usage

```text
Usage: random-chi [options] <k>

Options:

  -h,  --help               Print this message.
  -V,  --version            Print the package version.
       --sep sep            Separator used to join streamed data. Default: '\n'.
  -n,  --iter iterations    Number of pseudorandom numbers.
       --seed seed          Pseudorandom number generator seed.
       --state filepath     Path to a file containing the pseudorandom number
                            generator state.
       --snapshot filepath  Output file path for saving the pseudorandom number
                            generator state upon exit.
```

</section>

<!-- /.usage -->

<!-- CLI usage notes. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="notes">

### Notes

-   In accordance with POSIX convention, a trailing newline is **always** appended to generated output prior to exit.
-   Specifying a "snapshot" file path is useful when wanting to resume pseudorandom number generation due to, e.g., a downstream failure in an analysis pipeline. Before exiting, the process will store the pseudorandom number generator state in a file specified according to a provided file path. Upon loading a snapshot (state), the process will generate pseudorandom numbers starting from the loaded state, thus avoiding having to seed and replay an entire analysis.

</section>

<!-- /.notes -->

<!-- CLI usage examples. -->

<section class="examples">

### Examples

```bash
$ random-chi 1.0 -n 10 --seed 1234
```

</section>

<!-- /.examples -->

</section>

<!-- /.cli -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

* * *

## See Also

-   <span class="package-name">[`@stdlib/random/base/chi`][@stdlib/random/base/chi]</span><span class="delimiter">: </span><span class="description">Chi distributed pseudorandom numbers.</span>
-   <span class="package-name">[`@stdlib/random/iter/chi`][@stdlib/random/iter/chi]</span><span class="delimiter">: </span><span class="description">create an iterator for generating pseudorandom numbers drawn from a chi distribution.</span>

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library for JavaScript and Node.js, with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2022. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/random-streams-chi.svg
[npm-url]: https://npmjs.org/package/@stdlib/random-streams-chi

[test-image]: https://github.com/stdlib-js/random-streams-chi/actions/workflows/test.yml/badge.svg
[test-url]: https://github.com/stdlib-js/random-streams-chi/actions/workflows/test.yml

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/random-streams-chi/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/random-streams-chi?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/random-streams-chi.svg
[dependencies-url]: https://david-dm.org/stdlib-js/random-streams-chi/main

-->

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/random-streams-chi/tree/deno
[umd-url]: https://github.com/stdlib-js/random-streams-chi/tree/umd
[esm-url]: https://github.com/stdlib-js/random-streams-chi/tree/esm

[chat-image]: https://img.shields.io/gitter/room/stdlib-js/stdlib.svg
[chat-url]: https://gitter.im/stdlib-js/stdlib/

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/random-streams-chi/main/LICENSE

[stream]: https://nodejs.org/api/stream.html

[object-mode]: https://nodejs.org/api/stream.html#stream_object_mode

[readable-stream]: https://nodejs.org/api/stream.html

[chi]: https://en.wikipedia.org/wiki/Chi_distribution

[@stdlib/array/uint32]: https://github.com/stdlib-js/array-uint32

<!-- <related-links> -->

[@stdlib/random/base/chi]: https://github.com/stdlib-js/random-base-chi

[@stdlib/random/iter/chi]: https://github.com/stdlib-js/random-iter-chi

<!-- </related-links> -->

</section>

<!-- /.links -->
