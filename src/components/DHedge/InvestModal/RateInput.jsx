import {
	FormControl,
	Input,
	InputGroup,
	InputLeftAddon,
	InputLeftElement,
	InputRightAddon,
	InputRightElement,
	Tag,
	Text,
} from '@chakra-ui/react';
import { useMoralis } from 'react-moralis';

const RateInput = ({
	selectedToken,
	streamRate,
	setStreamRate,
	rateInputRef,
}) => {
	const { Moralis } = useMoralis();
	const {
		Units,
		web3Library: { BigNumber },
	} = Moralis;
	return (
		<FormControl aria-autocomplete='none'>
			<label htmlFor='rate'>
				Rate{' '}
				<Text as='span' fontSize='14'>
					/month
				</Text>
			</label>
			<Input
				min={0}
				value={streamRate}
				onChange={(e) => setStreamRate(() => (e.target.value || 0).toString())}
				autoComplete='new-password'
				type='number'
				id='rate'
				ref={rateInputRef}
			/>
			<Text as='span' fontSize='14' pl='4'>
				{/* Display Flow in /s */}
				{Units.FromWei(
					BigNumber.from(Units.ETH(streamRate ?? '0')).div(30 * 86400)
				)}{' '}
				{(selectedToken?.symbol || '') + 'x' || 'Tokens'}/s
			</Text>
		</FormControl>
	);
};

export default RateInput;
