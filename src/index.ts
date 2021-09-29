/**
 * A little utility type used for nominal typing.
 *
 * See {@link https://michalzalecki.com/nominal-typing-in-typescript/}
 */
type TypedNumber<T> = number & {

	/**
	 * # !!! DO NOT USE THIS PROPERTY IN YOUR CODE !!!
	 * ## This is just used to make each `TypedNumber` alias unique for Typescript and doesn't actually exist.
	 * @ignore
	 * @private
	 * @readonly
	 * @type {undefined}
	 */
	readonly __kind__: T;

};

/**
 * Same as `TypedNumber` but uses `bigint` instead of `number`.
 */
type BigTypedNumber<T> = bigint & {

	/**
	 * # !!! DO NOT USE THIS PROPERTY IN YOUR CODE !!!
	 * ## This is just used to make each `BigTypedNumber` alias unique for Typescript and doesn't actually exist.
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

export function i8(num: number | bigint): i8 {
	// If user supplied a BigInt, we calculate using BigInts. Otherwise just do the calculation normally.
	if (typeof num == 'bigint') return Number((num & 0x7fn) - (num & 0x80n)) as i8;
	return ((num & 0x7f) - (num & 0x80)) as i8;
}

/**
 * ## 8-bit unsigned integer
 *
 * - **Value Range:** `0` to `255`
 * - **Size in bytes:** `1`
 * - **Web IDL type:** `octet`
 * - **Equivalent C type:** `uint8_t`
 */
export type u8 = TypedNumber<'u8'>;

export function u8(num: number | bigint): u8 {
	// If user supplied a BigInt, we calculate using BigInts. Otherwise just do the calculation normally.
	if (typeof num == 'bigint') return Number(num & 0xffn) as u8;
	return (num & 0xff) as u8;
}

/**
 * ## 16-bit two's complement signed integer
 *
 * - **Value Range:** `-32768` to `32767`
 * - **Size in bytes:** `2`
 * - **Web IDL type:** `short`
 * - **Equivalent C type:** `int16_t`
 */
export type i16 = TypedNumber<'i16'>;

export function i16(num: number | bigint): i16 {
	// If user supplied a BigInt, we calculate using BigInts. Otherwise just do the calculation normally.
	if (typeof num == 'bigint') return Number((num & 0x7fffn) - (num & 0x8000n)) as i16;
	return ((num & 0x7fff) - (num & 0x8000)) as i16;
}

/**
 * ## 16-bit unsigned integer
 *
 * - **Value Range:** `0` to `65535`
 * - **Size in bytes:** `2`
 * - **Web IDL type:** `unsigned short`
 * - **Equivalent C type:** `uint16_t`
 */
export type u16 = TypedNumber<'u16'>;

export function u16(num: number | bigint): u16 {
	// If user supplied a BigInt, we calculate using BigInts. Otherwise just do the calculation normally.
	if (typeof num == 'bigint') return Number(num & 0xffffn) as u16;
	return (num & 0xffff) as u16;
}

/**
 * ## 32-bit two's complement signed integer
 *
 * - **Value Range:** `-2147483648` to `2147483647`
 * - **Size in bytes:** `4`
 * - **Web IDL type:** `long`
 * - **Equivalent C type:** `int32_t`
 */
export type i32 = TypedNumber<'i32'>;

export function i32(num: number | bigint): i32 {
	// Here we do the actual calculation using BigInt and convert back to number afterwards.
	const bigNum = typeof num == 'bigint' ? num : BigInt(num);
	return Number((bigNum & 0x7fff_ffffn) - (bigNum & 0x8000_0000n)) as i32;
}

/**
 * ## 32-bit unsigned integer
 *
 * - **Value Range:** `0` to `4294967295`
 * - **Size in bytes:** `4`
 * - **Web IDL type:** `unsigned long`
 * - **Equivalent C type:** `uint32_t`
 */
export type u32 = TypedNumber<'u32'>;

export function u32(num: number | bigint): u32 {
	// Here we do the actual calculation using BigInt and convert back to number afterwards.
	const bigNum = typeof num == 'bigint' ? num : BigInt(num);
	return Number(bigNum & 0xffff_ffffn) as u32;
}

/**
 * ## 64-bit two's complement signed integer
 *
 * - **Value Range:** `-9223372036854775808` to `9223372036854775807`
 * - **Size in bytes:** `8`
 * - **Web IDL type:** `bigint`
 * - **Equivalent C type:** `int64_t` (`signed long long`)
 */
export type i64 = BigTypedNumber<'i64'>;

export function i64(num: number | bigint): i64 {
	// This function returns a BigInt, so it's similar to the Int32 conversion, but we don't convert back to number.
	const bigNum = typeof num == 'bigint' ? num : BigInt(num);
	return ((bigNum & 0x7fff_ffff_ffff_ffffn) - (bigNum & 0x8000_0000_0000_0000n)) as i64;
}

/**
 * ## 64-bit unsigned integer
 *
 * - **Value Range:** `0` to `18446744073709551615`
 * - **Size in bytes:** `8`
 * - **Web IDL type:** `bigint`
 * - **Equivalent C type:** `uint64_t` (`unsigned long long`)
 */
export type u64 = BigTypedNumber<'u64'>;

export function u64(num: number | bigint): u64 {
	// This function returns a BigInt, so it's similar to the Uint32 conversion, but we don't convert back to number.
	const bigNum = typeof num == 'bigint' ? num : BigInt(num);
	return (bigNum & 0xffff_ffff_ffff_ffffn) as u64;
}

/**
 * ## 128-bit two's complement signed integer
 *
 * - **Value Range:** `-170141183460469231731687303715884105728` to `170141183460469231731687303715884105727`
 * - **Size in bytes:** `16`
 * - **Web IDL type:** `bigint`
 * - **Equivalent C type:** `int128_t`
 */
export type i128 = BigTypedNumber<'i128'>;

export function i128(num: number | bigint): i128 {
	// This function returns a BigInt, so it's similar to the Int32 conversion, but we don't convert back to number.
	const bigNum = typeof num == 'bigint' ? num : BigInt(num);
	return ((bigNum & 0x7fff_ffff_ffff_ffff_ffff_ffff_ffff_ffffn) - (bigNum & 0x8000_0000_0000_0000_0000_0000_0000_0000n)) as i128;
}

/**
 * ## 128-bit unsigned integer
 *
 * - **Value Range:** `0` to `340282366920938463463374607431768211455`
 * - **Size in bytes:** `16`
 * - **Web IDL type:** `bigint`
 * - **Equivalent C type:** `uint128_t`
 */
export type u128 = BigTypedNumber<'u128'>;

export function u128(num: number | bigint): u128 {
	// This function returns a BigInt, so it's similar to the Uint32 conversion, but we don't convert back to number.
	const bigNum = typeof num == 'bigint' ? num : BigInt(num);
	return (bigNum & 0xffff_ffff_ffff_ffff_ffff_ffff_ffff_ffffn) as u128;
}
