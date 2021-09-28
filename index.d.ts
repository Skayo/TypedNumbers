
export interface Int8 {

	get(): number;
	set(value: any): void;

	/**
	 * Returns a string representation of the value.
	 * @param {number} [radix = 10] - Specifies a radix for converting numeric values to strings.
	 */
	toString(radix?: number): string;

}

export interface Int8Constructor {

	/**
	 * Construct a new Int8 instance.
	 * @param {ArrayBufferLike} buffer - An existing ArrayBuffer or SharedArrayBuffer to use as the storage backing the new typed number object.
	 * @param {number} [byteOffset = 0] - The offset (in bytes) from the start of the array buffer, where to store the data.
	 * @param {boolean} [littleEndian = false] - Indicates whether the number is stored in little- or big-endian format. If `false` or `undefined`, a big-endian value is written.
	 */
	new(buffer: ArrayBufferLike, byteOffset?: number, littleEndian?: boolean): Int8;

	/**
	 * Construct a new Int8 instance.
	 * @param {boolean} [littleEndian = false] - Indicates whether the number is stored in little- or big-endian format. If `false` or `undefined`, a big-endian value is written.
	 */
	new(littleEndian?: boolean): Int8;

	/**
	 * The smallest value that can be represented by this number type.
	 */
	readonly MIN: 0;

	/**
	 * The largest value that can be represented by this number type.
	 */
	readonly MAX: 255;

	/**
	 * The size of this number type in bits.
	 */
	readonly BITS: 8;

	/**
	 * Object prototype.
	 */
	readonly prototype: Int8;

}

declare var Int8: Int8Constructor;
