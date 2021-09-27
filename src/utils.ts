export function parseValue(value: any): number {
	if (typeof value === 'number') {
		return value;
	}

	let val = Number(value);

	if (isNaN(val)) return 0;
	return val;
}
