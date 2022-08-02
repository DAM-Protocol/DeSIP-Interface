/* eslint-disable no-mixed-spaces-and-tabs */
// input 0.854109531353579658, output 0.854
// input 0.0000008541, output 0.000000854
// input 3.000854123, output 3.000854
const decimalFormatter = (
	num = '0.0',
	significantDecimals = 2,
	numberOfDigits = 2
) => {
	num = String(num);
	let tempNum = num;

	const firstNonZeroDigitIndex = tempNum.split('.')?.[1]?.search(/[1-9]/);

	const parts = tempNum.split('.');

	const res =
		parts[0] +
		(parts?.[1]
			? '.' + parts?.[1].substring(0, firstNonZeroDigitIndex + numberOfDigits)
			: '');

	return res;
};
export default decimalFormatter;
