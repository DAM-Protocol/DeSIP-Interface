import { FormControl, Input } from '@chakra-ui/react';

const RateInput = ({
	selectedToken,
	streamRate,
	setStreamRate,
	rateInputRef,
}) => {
	return (
		<FormControl aria-autocomplete='none'>
			<label htmlFor='rate'>
				Rate ({(selectedToken?.symbol || '') + 'x' || 'Tokens'}/month)
			</label>
			<Input
				min={0}
				value={streamRate}
				onChange={(e) => setStreamRate(e.target.value)}
				autoComplete='new-password'
				type='number'
				id='rate'
				ref={rateInputRef}
			/>
		</FormControl>
	);
};

export default RateInput;
