import { TypedNumber } from './TypedNumber';

export class Int8 extends TypedNumber {

	/**
	 * The smallest value that can be represented by this typed number.
	 */
	public static readonly MIN = -128;
	public readonly MIN = Int8.MIN;

	/**
	 * The largest value that can be represented by this typed number.
	 */
	public static readonly MAX = 127;
	public readonly MAX = Int8.MAX;

	/**
	 * The size of this typed number in bits.
	 */
	public static readonly BITS = 8;
	public readonly BITS = Int8.BITS;

	/**
	 * Class constructor.
	 * @param value - Initial value of any type.
	 */
	constructor(value?: any) {
		super(value);
		this.set(value);
	}

	/**
	 * Returns a new instance of this typed number.
	 * @param value - Initial value of any type.
	 */
	protected getNewInstance(value?: any): Int8 {
		return new Int8(value);
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

}
