import { parseValue } from './utils';

export class TypedNumber {

	/**
	 * The smallest value that can be represented by this typed number.
	 */
	public readonly MIN: number = 0; // Set to unsigned 8-bit's min value of 0, but should be overwritten by child classes!

	/**
	 * The largest value that can be represented by this typed number.
	 */
	public readonly MAX: number = 255; // Set to unsigned 8-bit's max value of 255, but should be overwritten by child classes!

	/**
	 * The smallest value that can be represented by this typed number.
	 */
	public readonly BITS: 8 | 16 | 32 | 64 | 128 = 8; // Set to unsigned 8-bit's bits of 8, but should be overwritten by child classes!

	/**
	 * Bit mask used in some calculations.
	 * For example:
	 * - `0xff` for 8-Bit
	 * - `0xffff` for 16-Bit
	 * - `0xffffffff` for 32-Bit
	 * - etc.
	 * @protected
	 */
	protected readonly BIT_MASK: number = 0xff;

	/**
	 * The ArrayBuffer instance referenced by the internal DataView instance.
	 */
	public readonly buffer: ArrayBufferLike;

	/**
	 * The internal DataView instance used to access `buffer`.
	 * @protected
	 */
	protected readonly dataView: DataView;

	/**
	 * Class constructor.
	 * @param value - Initial value of any type.
	 */
	protected constructor(value?: any) {
		const byteLength = this.BITS / 8;

		this.buffer = new ArrayBuffer(byteLength);
		this.dataView = new DataView(this.buffer, 0, byteLength);
	}

	/**
	 * Returns a new instance of this typed number.
	 * @protected
	 */
	protected getNewInstance(value?: any): TypedNumber {
		return new TypedNumber(value);
	}

	/**
	 * Get value of this typed number.
	 */
	public get(): number {
		return this.dataView.getInt8(0);
	}

	/**
	 * Set the value of this typed number.
	 * @param value - The new value.
	 */
	protected _set(value: number) {
		this.dataView.setInt8(0, value);
	}

	/**
	 * Set the value of this typed number, throwing an error on overflow.
	 * @param value - The new value.
	 */
	public set(value: any) {
		const _value = parseValue(value);

		if (_value < this.MIN || _value > this.MAX) {
			throw new RangeError(`The value of "value" is out of range. It must be >= ${this.MIN} and <= ${this.MAX}. Received ${_value}`);
		}

		this._set(_value);
	}

	/**
	 * Set the value of this typed number, wrapping around the boundary of the type on overflow.
	 * @param value - The new value.
	 */
	public wrappingSet(value: any) {
		const _value = parseValue(value);

		this._set(_value & ((2 ** this.BITS) - 1));
	}

	/**
	 * Special method that returns the value of this typed number.
	 *
	 * @example
	 * const num = Uint8(255);
	 * console.log(+num); // -> 255
	 */
	public valueOf(): number {
		return this.get();
	}

	/**
	 * Special method that returns the string representation of this typed number.
	 *
	 * @example
	 * const num = Uint8(255);
	 *
	 * // Without this method:
	 * console.log(num.toString()); // -> "[object Object]"
	 *
	 * // With this method:
	 * console.log(num.toString()); // -> "255"
	 */
	public toString(radix?: number): string {
		return this.get().toString(radix);
	}

	/**
	 * Returns the number of ones in the binary representation of this typed number.
	 */
	public countOnes(): number {
		let num = this.get();
		let count = 0;

		while (num) {
			count += num & 1;
			num >>= 1;
		}

		return count;
	}

	/**
	 * Returns the number of zeros in the binary representation of this typed number.
	 */
	public countZeros(): number {
		let num = this.get();
		let count = 0;

		for (let i = 0; i < this.BITS; i++) {
			count += +!(num & 1);
			num >>= 1;
		}

		return count;
	}

	/**
	 * Returns the number of leading zeros in the binary representation of this typed number.
	 */
	public leadingZeros(): number {
		const num = this.get();
		let count = 0;
		let i = 1;

		while (!((num >> this.BITS - i++) & 1)) {
			count++;
		}

		return count;
	}

	/**
	 * Returns the number of trailing zeros in the binary representation of this typed number.
	 */
	public trailingZeros(): number {
		let num = this.get();
		let count = 0;

		while (!(num & 1)) {
			count += +!(num & 1);
			num >>= 1;
		}

		return count;
	}

	/**
	 * Returns the number of leading ones in the binary representation of this typed number.
	 */
	public leadingOnes(): number {
		const num = this.get();
		let count = 0;
		let i = 1;

		while ((num >> this.BITS - i++) & 1) {
			count++;
		}

		return count;
	}

	/**
	 * Returns the number of trailing ones in the binary representation of this typed number.
	 */
	public trailingOnes(): number {
		let num = this.get();
		let count = 0;

		while (num & 1) {
			count += num & 1;
			num >>= 1;
		}

		return count;
	}

	/**
	 * Shifts the bits to the left by a specified amount, `n`, wrapping the truncated bits to the end of the resulting integer.
	 *
	 * Please note this isn’t the same operation as the `<<` shifting operator!
	 * @param amount - The amount of times to rotate the bits
	 */
	public rotateLeft(amount: number) {
		let num = this.get();

		for (let i = 0; i < amount; i++) {
			num = ((num << 1) & ((2 ** this.BITS) - 1)) | ((num >> this.BITS - 1) & 1);
		}

		return this.getNewInstance(num);
	}

	/**
	 * Shifts the bits to the right by a specified amount, `amount`, wrapping the truncated bits to the beginning of the resulting integer.
	 *
	 * Please note this isn’t the same operation as the `>>` shifting operator!
	 * @param amount - The amount of times to rotate the bits
	 */
	public rotateRight(amount: number) {
		let num = this.get();

		for (let i = 0; i < amount; i++) {
			num = ((num >>> 1) & ((2 ** this.BITS) - 1)) | ((num & 1) << this.BITS - 1);
		}

		return this.getNewInstance(num);
	}

	/**
	 * Reverses the order of bits in the integer.
	 * The least significant bit becomes the most significant bit, second least-significant bit becomes second most-significant bit, etc.
	 */
	public reverseBits() {
		const num = this.get();
		let result = 0;

		for (let i = 0; i < this.BITS; i++) {
			result |= ((num >> i) & 1) << (this.BITS - 1 - i);
		}

		return this.getNewInstance(result);
	}

}
