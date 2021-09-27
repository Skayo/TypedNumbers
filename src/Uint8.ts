import { TypedNumber } from './TypedNumber';

export class Uint8 extends TypedNumber {

	/**
	 * The smallest value that can be represented by this typed number.
	 */
	public static readonly MIN = 0;
	public readonly MIN = Uint8.MIN;

	/**
	 * The largest value that can be represented by this typed number.
	 */
	public static readonly MAX = 255;
	public readonly MAX = Uint8.MAX;

	/**
	 * The size of this typed number in bits.
	 */
	public static readonly BITS = 8;
	public readonly BITS = Uint8.BITS;

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
	protected getNewInstance(value?: any): Uint8 {
		return new Uint8(value);
	}

	/**
	 * Get value of this typed number.
	 */
	public get(): number {
		return this.dataView.getUint8(0);
	}

	/**
	 * Set the value of this typed number.
	 * @param value - The new value.
	 */
	protected _set(value: number) {
		this.dataView.setUint8(0, value);
	}

}
