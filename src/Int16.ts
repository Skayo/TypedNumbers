import { TypedNumber } from './TypedNumber';

export class Int16 extends TypedNumber {

	/**
	 * The smallest value that can be represented by this typed number.
	 */
	public static readonly MIN = -32768;
	public readonly MIN = Int16.MIN;

	/**
	 * The largest value that can be represented by this typed number.
	 */
	public static readonly MAX = 32767;
	public readonly MAX = Int16.MAX;

	/**
	 * The size of this typed number in bits.
	 */
	public static readonly BITS = 16;
	public readonly BITS = Int16.BITS;

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
	protected getNewInstance(value?: any): Int16 {
		return new Int16(value);
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
		this.dataView.setInt16(0, value);
	}

}
