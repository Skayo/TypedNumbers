/**
 * An 8-bit integer.
 * The value is initialized to 0.
 * If the required number of bytes could not be allocated an exception is raised.
 */
export interface Int8 {

	/**
	 * The value.
	 */
	value: number;

	/**
	 * Length of the typed number in bytes.
	 */
	readonly byteLength: number;

	/**
	 * The offset (in bytes) from the start of the ArrayBuffer, where data is stored.
	 */
	readonly byteOffset: number;

	/**
	 * The ArrayBuffer instance referenced by the internal DataView instance.
	 */
	readonly buffer: ArrayBufferLike;

	/**
	 * Sets the value to a new value.
	 * Same as `TypedNumber.value = newValue`.
	 * @param value - The new value.
	 */
	set(value: any): void;

	/**
	 * Returns the value.
	 * Same as `TypedNumber.value`.
	 */
	get(): number;

	/**
	 * Special method that returns the internal value when converting an instance to number.
	 * @example
	 * const num = new Uint8();
	 * num.set(15);
	 *
	 * console.log(+num); // -> 15
	 */
	valueOf(): number;

	/**
	 * Returns a string representation of the value.
	 * @param {number} [radix = 10] - Specifies a radix for converting numeric values to strings.
	 */
	toString(radix?: number): string;

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
	[Symbol.toStringTag](): string;

}

export interface Int8Constructor {

	/**
	 * Construct a new instance.
	 * @param {ArrayBufferLike} buffer - An existing ArrayBuffer or SharedArrayBuffer to use as the storage backing the new typed number object.
	 * @param {number} [byteOffset = 0] - The offset (in bytes) from the start of the array buffer, where to store the data.
	 * @param {boolean} [littleEndian = false] - Indicates whether the number is stored in little- or big-endian format. If `false` or `undefined`, a big-endian value is written.
	 */
	new(buffer: ArrayBufferLike, byteOffset?: number, littleEndian?: boolean): Int8;

	/**
	 * Construct a new instance.
	 * @param {boolean} [littleEndian = false] - Indicates whether the number is stored in little- or big-endian format. If `false` or `undefined`, a big-endian value is written.
	 */
	new(littleEndian?: boolean): Int8;

	/**
	 * The smallest value that can be represented by this number type.
	 */
	readonly MIN_VALUE: 0;

	/**
	 * The largest value that can be represented by this number type.
	 */
	readonly MAX_VALUE: 255;

	/**
	 * The size of this number type in bytes.
	 */
	readonly BYTES: 1;

	/**
	 * Object prototype.
	 */
	readonly prototype: Int8;

}

declare var Int8: Int8Constructor;

export type TypedNumber = Int8;
