import { TypedNumber } from './TypedNumber';

export class Uint16 extends TypedNumber {

	/**
	 * The smallest value that can be represented by this typed number.
	 */
	public static readonly MIN = 0;
	public readonly MIN = Uint16.MIN;

	/**
	 * The largest value that can be represented by this typed number.
	 */
	public static readonly MAX = 65535;
	public readonly MAX = Uint16.MAX;

	/**
	 * The size of this typed number in bits.
	 */
	public static readonly BITS = 16;
	public readonly BITS = Uint16.BITS;

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
	protected getNewInstance(value?: any): Uint16 {
		return new Uint16(value);
	}

	/**
	 * Get value of this typed number.
	 */
	public get(): number {
		return this.dataView.getUint16(0);
	}

	/**
	 * Set the value of this typed number.
	 * @param value - The new value.
	 */
	protected _set(value: number) {
		this.dataView.setUint16(0, value);
	}

}
