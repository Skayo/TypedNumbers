/**
 * A little utility type used for nominal typing.
 *
 * See {@link https://michalzalecki.com/nominal-typing-in-typescript/}
 */
type TypedNumber<T> = number & {

	/**
	 * # !!! DO NOT USE THIS PROPERTY IN YOUR CODE !!!
	 * ## This is just used to make each TypedNumber unique for Typescript and doesn't actually exist.
	 * @ignore
	 * @private
	 * @readonly
	 * @type {undefined}
	 */
	readonly __kind__: T;

};

/**
 * Same as the above but uses `bigint` instead of `number`.
 */
type BigIntTypedNumber<T> = bigint & {

	/**
	 * # !!! DO NOT USE THIS PROPERTY IN YOUR CODE !!!
	 * ## This is just used to make each BigIntTypedNumber unique for Typescript and doesn't actually exist.
	 * @ignore
	 * @private
	 * @readonly
	 * @type {undefined}
	 */
	readonly __kind__: T;

};


/**
 * ## 8-bit two's complement signed integer
 *
 * - **Value Range:** `-128` to `127`
 * - **Size in bytes:** `1`
 * - **Web IDL type:** `byte`
 * - **Equivalent C type:** `int8_t`
 */
export type i8 = TypedNumber<'i8'>;

export const i8 = (num: number | bigint): i8 => {
	// If user supplied a BigInt, we calculate using BigInts. Otherwise just do the calculation normally.
	if (typeof num == 'bigint') return Number((num & 0x7fn) - (num & 0x80n)) as i8;
	return ((num & 0x7f) - (num & 0x80)) as i8;
};

/**
 * ## 8-bit unsigned integer
 *
 * - **Value Range:** `0` to `255`
 * - **Size in bytes:** `1`
 * - **Web IDL type:** `octet`
 * - **Equivalent C type:** `uint8_t`
 */
export type u8 = TypedNumber<'u8'>;

export const u8 = (num: number | bigint): u8 => {
	// If user supplied a BigInt, we calculate using BigInts. Otherwise just do the calculation normally.
	if (typeof num == 'bigint') return Number(num & 0xffn) as u8;
	return (num & 0xff) as u8;
};

/**
 * ## 16-bit two's complement signed integer
 *
 * - **Value Range:** `-32768` to `32767`
 * - **Size in bytes:** `2`
 * - **Web IDL type:** `short`
 * - **Equivalent C type:** `int16_t`
 */
export type i16 = TypedNumber<'i16'>;

export const i16 = (num: number | bigint): i16 => {
	// If user supplied a BigInt, we calculate using BigInts. Otherwise just do the calculation normally.
	if (typeof num == 'bigint') return Number((num & 0x7fffn) - (num & 0x8000n)) as i16;
	return ((num & 0x7fff) - (num & 0x8000)) as i16;
};

/**
 * ## 16-bit unsigned integer
 *
 * - **Value Range:** `0` to `65535`
 * - **Size in bytes:** `2`
 * - **Web IDL type:** `unsigned short`
 * - **Equivalent C type:** `uint16_t`
 */
export type u16 = TypedNumber<'u16'>;

export const u16 = (num: number | bigint): u16 => {
	// If user supplied a BigInt, we calculate using BigInts. Otherwise just do the calculation normally.
	if (typeof num == 'bigint') return Number(num & 0xffffn) as u16;
	return (num & 0xffff) as u16;
};

/**
 * ## 32-bit two's complement signed integer
 *
 * - **Value Range:** `-2147483648` to `2147483647`
 * - **Size in bytes:** `4`
 * - **Web IDL type:** `long`
 * - **Equivalent C type:** `int32_t`
 */
export type i32 = TypedNumber<'i32'>;

export const i32 = (num: number | bigint): i32 => {
	// Here we do the actual calculation using BigInt and convert back to number afterwards.
	const bigNum = typeof num == 'bigint' ? num : BigInt(num);
	return Number((bigNum & 0x7fff_ffffn) - (bigNum & 0x8000_0000n)) as i32;
};

/**
 * ## 32-bit unsigned integer
 *
 * - **Value Range:** `0` to `4294967295`
 * - **Size in bytes:** `4`
 * - **Web IDL type:** `unsigned long`
 * - **Equivalent C type:** `uint32_t`
 */
export type u32 = TypedNumber<'u32'>;

export const u32 = (num: number | bigint): u32 => {
	// Here we do the actual calculation using BigInt and convert back to number afterwards.
	const bigNum = typeof num == 'bigint' ? num : BigInt(num);
	return Number(bigNum & 0xffff_ffffn) as u32;
};

/**
 * ## 64-bit two's complement signed integer
 *
 * - **Value Range:** `-2^63` to `2^63 - 1`
 * - **Size in bytes:** `8`
 * - **Web IDL type:** `bigint`
 * - **Equivalent C type:** `int64_t` (`signed long long`)
 */
export type i64 = BigIntTypedNumber<'i64'>;

export const i64 = (num: number | bigint): i64 => {
	// This function returns a BigInt, so it's similar to the Int32 conversion, but we don't convert back to number.
	const bigNum = typeof num == 'bigint' ? num : BigInt(num);
	return ((bigNum & 0x7fff_ffff_ffff_ffffn) - (bigNum & 0x8000_0000_0000_0000n)) as i64;
};

/**
 * ## 64-bit unsigned integer
 *
 * - **Value Range:** `0` to `2^64 - 1`
 * - **Size in bytes:** `8`
 * - **Web IDL type:** `bigint`
 * - **Equivalent C type:** `uint64_t` (`unsigned long long`)
 */
export type u64 = BigIntTypedNumber<'u64'>;

export const u64 = (num: number | bigint): u64 => {
	// This function returns a BigInt, so it's similar to the Uint32 conversion, but we don't convert back to number.
	const bigNum = typeof num == 'bigint' ? num : BigInt(num);
	return (bigNum & 0xffff_ffff_ffff_ffffn) as u64;
};

/**
 * ## 32-bit IEEE floating point number
 * ### (7 significant digits e.g., `1.123456`)
 *
 * - **Value Range:** `-3.4E38` to `3.4E38` and `1.2E-38` is the min positive number
 * - **Size in bytes:** `4`
 * - **Web IDL type:** `unrestricted float`
 * - **Equivalent C type:** `float`
 */
export type f32 = TypedNumber<'f32'>;

// TODO: f32 convert function

/**
 * ## 64-bit IEEE floating point number
 * ### (16 significant digits e.g., `1.123...15`)
 *
 * - **Value Range:** `-1.8E308` to `1.8E308` and `5E-324` is the min positive number
 * - **Size in bytes:** `8`
 * - **Web IDL type:** `unrestricted double`
 * - **Equivalent C type:** `double`
 */
export type f64 = TypedNumber<'f64'>;

// TODO: f64 convert function
