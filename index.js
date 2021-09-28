/**
 * Takes a value of any type and converts it to number.
 * @param {*} value - A value of any type.
 * @return {number} - The number or `0` on NaN
 */
function parseValue(value) {
	if (typeof value === 'number') return value;

	let val = Number(value);

	if (isNaN(val)) return 0;
	return val;
}

/**
 * Factory function that creates a typed number.
 * @param {string} NAME
 * @param {boolean} UNSIGNED
 * @param {number} BITS
 * @param {number} MIN_VALUE
 * @param {number} MAX_VALUE
 * @return {TypedNumber}
 */
function createTypedNumber({
	name:     NAME,
	unsigned: UNSIGNED,
	bits:     BITS,
	minValue: MIN_VALUE,
	maxValue: MAX_VALUE,
}) {
	/** Length of the typed number in bytes. */
	const BYTES = BITS / 8;

	/**
	 * Construct a new TypedNumber instance.
	 * @param {ArrayBufferLike | boolean} [arg = false] - An existing ArrayBuffer or SharedArrayBuffer to use as the storage backing the new typed number object, or a boolean describing the endianness (see littleEndian parameter).
	 * @param {number} [byteOffset = 0] - The offset (in bytes) from the start of the array buffer, where to store the data.
	 * @param {boolean} [littleEndian = false] - Indicates whether the number is stored in little- or big-endian format. If `false` or `undefined`, a big-endian value is written.
	 * @constructor
	 */
	function TypedNumber(arg, byteOffset = 0, littleEndian = false) {
		const _byteOffset = typeof byteOffset === 'number' ? byteOffset : +byteOffset;
		const _littleEndian = typeof arg === 'boolean' ? arg : !!littleEndian;

		const _buffer = arg != null && typeof arg !== 'boolean' ? arg : new ArrayBuffer(BYTES);
		const _dataView = new DataView(_buffer, _byteOffset, BYTES);


		/**
		 * Sets the value stored in the internal DataView instance.
		 * @type {(value: number) => void}
		 */
		let set;

		/**
		 * Gets the value stored in the internal DataView instance.
		 * @type {() => number}
		 */
		let get;

		if (BITS === 8) {
			if (UNSIGNED) {
				set = (value) => _dataView.setUint8(0, value);
				get = () => _dataView.getUint8(0);
			} else {
				set = (value) => _dataView.setInt8(0, value);
				get = () => _dataView.getInt8(0);
			}
		} else if (BITS === 16) {
			if (UNSIGNED) {
				set = (value) => _dataView.setUint16(0, value, _littleEndian);
				get = () => _dataView.getUint16(0, _littleEndian);
			} else {
				set = (value) => _dataView.setInt16(0, value, _littleEndian);
				get = () => _dataView.getInt16(0, _littleEndian);
			}
		} else {
			if (UNSIGNED) {
				set = (value) => _dataView.setUint32(0, value, _littleEndian);
				get = () => _dataView.getUint32(0, _littleEndian);
			} else {
				set = (value) => _dataView.setInt32(0, value, _littleEndian);
				get = () => _dataView.getInt32(0, _littleEndian);
			}
		}

		// We define the instance properties like this, so they can't be overwritten:
		Object.defineProperties(this, {
			/**
			 * The internal value.
			 * @type {number}
			 */
			value: { get, set },

			/**
			 * Length of the typed number in bytes.
			 * @type {number}
			 */
			byteLength: { value: BYTES, enumerable: true },

			/**
			 * The offset (in bytes) from the start of the ArrayBuffer, where data is stored.
			 * @type {number}
			 */
			byteOffset: { value: _byteOffset, enumerable: true },

			/**
			 * The ArrayBuffer instance referenced by the internal DataView instance.
			 * @type {ArrayBufferLike}
			 */
			buffer: { value: _buffer, enumerable: true },
		});
	}

	// We define the static methods/properties like this, so they can't be overwritten:
	Object.defineProperties(TypedNumber, {
		/**
		 * The smallest value that can be represented by this number type.
		 * @type {number}
		 */
		MIN_VALUE: { value: MIN_VALUE },

		/**
		 * The largest value that can be represented by this number type.
		 * @type {number}
		 */
		MAX_VALUE: { value: MAX_VALUE },

		/**
		 * The size of this number type in bytes.
		 * @type {number}
		 */
		BYTES: { value: BYTES },
	});

	// Same here. We define the non-static methods/properties like this, so they can't be overwritten:
	Object.defineProperties(TypedNumber.prototype, {
		/**
		 * Sets the internal value to a new value.
		 * @type {(value: number) => void}
		 */
		set: {
			value: function (value) {
				this.value = parseValue(value);
			},
		},

		/**
		 * Returns the internal value.
		 * @type {() => number}
		 */
		get: {
			value: function () {
				return this.value;
			},
		},

		/**
		 * Special method that returns the internal value when converting an instance to number.
		 * @type {() => number}
		 * @example
		 * const num = Uint8();
		 * num.set(15);
		 *
		 * console.log(+num); // -> 15
		 */
		valueOf: {
			value: function () {
				return this.get();
			},
		},

		/**
		 * Returns a string representation of the value.
		 * @type {(radix: number) => string}
		 */
		toString: {
			value: function (radix) {
				return this.value.toString(radix);
			},
		},

		/**
		 * Special method that returns the typed number name when using `Object.prototype.toString.call(...)`.
		 *
		 * @example
		 * const num = new Uint8();
		 *
		 * // Without this method:
		 * console.log(Object.prototype.toString.call(num)); // -> [object Object]
		 *
		 * // With this method:
		 * console.log(Object.prototype.toString.call(num)); // -> [object Uint8]
		 */
		[Symbol.toStringTag]: { value: NAME },
	});

	return TypedNumber;
}

/** @type {import('.').Int8} */
exports.Int8 = createTypedNumber({
	name:     'Int8',
	unsigned: false,
	bits:     8,
	minValue: -128,
	maxValue: 127,
});

exports.Uint8 = createTypedNumber({
	name:     'Uint8',
	unsigned: true,
	bits:     8,
	minValue: 0,
	maxValue: 255,
});

exports.Int16 = createTypedNumber({
	name:     'Int16',
	unsigned: false,
	bits:     16,
	minValue: -32768,
	maxValue: 32767,
});

exports.Uint16 = createTypedNumber({
	name:     'Uint16',
	unsigned: true,
	bits:     16,
	minValue: 0,
	maxValue: 65535,
});

exports.Int32 = createTypedNumber({
	name:     'Int32',
	unsigned: false,
	bits:     32,
	minValue: -2147483648,
	maxValue: 2147483647,
});

exports.Uint32 = createTypedNumber({
	name:     'Uint32',
	unsigned: true,
	bits:     32,
	minValue: 0,
	maxValue: 4294967295,
});
