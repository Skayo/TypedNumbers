import { TypedNumber } from './TypedNumber';

export class Int32 extends TypedNumber {

	/**
	 * The smallest value that can be represented by this typed number.
	 */
	public static readonly MIN = -2147483648;
	public readonly MIN = Int32.MIN;

	/**
	 * The largest value that can be represented by this typed number.
	 */
	public static readonly MAX = 2147483647;
	public readonly MAX = Int32.MAX;

	/**
	 * The size of this typed number in bits.
	 */
	public static readonly BITS = 32;
	public readonly BITS = Int32.BITS;

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
	protected getNewInstance(value?: any): Int32 {
		return new Int32(value);
	}

	/**
	 * Get value of this typed number.
	 */
	public get(): number {
		return this.dataView.getInt16(0);
	}

	/**
	 * Set the value of this typed number.
	 * @param value - The new value.
	 */
	protected _set(value: number) {
		this.dataView.setInt32(0, value);
	}

}
