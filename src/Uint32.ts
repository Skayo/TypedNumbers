import { TypedNumber } from './TypedNumber';

export class Uint32 extends TypedNumber {

	/**
	 * The smallest value that can be represented by this typed number.
	 */
	public static readonly MIN = 0;
	public readonly MIN = Uint32.MIN;

	/**
	 * The largest value that can be represented by this typed number.
	 */
	public static readonly MAX = 4294967295;
	public readonly MAX = Uint32.MAX;

	/**
	 * The size of this typed number in bits.
	 */
	public static readonly BITS = 32;
	public readonly BITS = Uint32.BITS;

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
	protected getNewInstance(value?: any): Uint32 {
		return new Uint32(value);
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
		this.dataView.setUint32(0, value);
	}

}
