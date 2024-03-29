/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var tape = require( 'tape' );
var rand = require( '@stdlib/random-base-chi' );
var validate = require( './../lib/validate.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof validate, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns an error if provided an options argument which is not an object', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		'5',
		5,
		NaN,
		true,
		false,
		void 0,
		null,
		[],
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, values[ i ] );
		t.equals( err instanceof TypeError, true, 'returns a type error when provided '+values[i] );
	}
	t.end();
});

tape( 'the function returns an error if provided an `objectMode` option which is not a boolean primitive', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		'5',
		5,
		NaN,
		void 0,
		null,
		[],
		{},
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'objectMode': values[ i ]
		});
		t.equal( err instanceof TypeError, true, 'returns a type error when provided '+values[i] );
	}
	t.end();
});

tape( 'the function returns an error if provided a `highWaterMark` option which is not a nonnegative number', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		'5',
		-5,
		NaN,
		true,
		false,
		void 0,
		null,
		[],
		{},
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'highWaterMark': values[ i ]
		});
		t.equal( err instanceof TypeError, true, 'returns a type error when provided '+values[i] );
	}
	t.end();
});

tape( 'the function returns an error if provided an `encoding` option which is neither a string nor `null`', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		5,
		NaN,
		true,
		false,
		void 0,
		[],
		{},
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'encoding': values[ i ]
		});
		t.equal( err instanceof TypeError, true, 'returns a type error when provided '+values[i] );
	}
	t.end();
});

tape( 'the function returns an error if provided a `sep` option which is not a string', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		5,
		NaN,
		true,
		false,
		null,
		void 0,
		[],
		{},
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'sep': values[ i ]
		});
		t.equal( err instanceof TypeError, true, 'returns a type error when provided '+values[i] );
	}
	t.end();
});

tape( 'the function returns an error if provided an `siter` option which is not a positive integer', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		'5',
		-5,
		3.14,
		NaN,
		true,
		false,
		void 0,
		null,
		[],
		{},
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'siter': values[ i ]
		});
		t.equal( err instanceof TypeError, true, 'returns a type error when provided '+values[i] );
	}
	t.end();
});

tape( 'the function sets the `iter` option', function test( t ) {
	var options;
	var opts;
	var err;

	opts = {};
	options = {
		'iter': 10
	};

	err = validate( opts, options );
	t.equal( err, null, 'returns expected value' );
	t.deepEqual( opts, options, 'sets option values' );
	t.end();
});

tape( 'the function sets the `prng` option', function test( t ) {
	var options;
	var opts;
	var err;

	opts = {};
	options = {
		'prng': rand.PRNG
	};

	err = validate( opts, options );
	t.equal( err, null, 'returns expected value' );
	t.deepEqual( opts, options, 'sets option values' );
	t.end();
});

tape( 'the function sets the `seed` option', function test( t ) {
	var options;
	var opts;
	var err;

	opts = {};
	options = {
		'seed': rand.seed
	};

	err = validate( opts, options );
	t.equal( err, null, 'returns expected value' );
	t.deepEqual( opts, options, 'sets option values' );
	t.end();
});

tape( 'the function sets the `state` option', function test( t ) {
	var options;
	var opts;
	var err;

	opts = {};
	options = {
		'state': rand.state
	};

	err = validate( opts, options );
	t.equal( err, null, 'returns expected value' );
	t.deepEqual( opts, options, 'sets option values' );
	t.end();
});

tape( 'the function sets the `copy` option', function test( t ) {
	var options;
	var opts;
	var err;

	opts = {};
	options = {
		'copy': true
	};

	err = validate( opts, options );
	t.equal( err, null, 'returns expected value' );
	t.deepEqual( opts, options, 'sets option values' );
	t.end();
});

tape( 'the function returns null if all options are valid', function test( t ) {
	var options;
	var opts;
	var err;

	options = {
		'objectMode': true,
		'highWaterMark': 64,
		'encoding': null,
		'sep': '\n',
		'siter': 10,
		'iter': 100,
		'state': rand.state,
		'seed': rand.seed,
		'prng': rand.PRNG,
		'copy': true
	};
	opts = {};
	err = validate( opts, options );

	t.equal( err, null, 'returns null' );
	t.deepEqual( opts, options, 'sets option values' );

	options = {
		'objectMode': false,
		'highWaterMark': 64,
		'encoding': 'utf8',
		'sep': '\t',
		'siter': 10,
		'iter': 100,
		'state': rand.state,
		'seed': rand.seed,
		'prng': rand.PRNG,
		'copy': false
	};
	opts = {};
	err = validate( opts, options );

	t.equal( err, null, 'returns null' );
	t.deepEqual( opts, options, 'sets option values' );

	t.end();
});

tape( 'the function ignores unrecognized/unsupported options', function test( t ) {
	var options;
	var opts;
	var err;

	options = {
		'beep': true,
		'boop': 'bop'
	};
	opts = {};
	err = validate( opts, options );

	t.equal( err, null, 'returns null' );
	t.deepEqual( opts, {}, 'does not set any option values' );
	t.end();
});
