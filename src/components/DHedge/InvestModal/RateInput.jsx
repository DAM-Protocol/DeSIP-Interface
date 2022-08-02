import {
	FormControl,
	Input,
	InputGroup,
	InputRightAddon,
	Text,
} from '@chakra-ui/react';
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis';
import { erc20Abi } from '../../../abi/erc20';
import decimalFormatter from '../../../utils/decimalFormatter';

const RateInput = ({
	selectedToken,
	streamRate,
	setStreamRate,
	rateInputRef,
}) => {
	const { Moralis, account } = useMoralis();
	const {
		Units,
		web3Library: { BigNumber },
	} = Moralis;
	const { data: selectedTokenBalance } = useWeb3ExecuteFunction(
		{
			functionName: 'balanceOf',
			abi: erc20Abi,
			contractAddress: selectedToken?.superTokenAddress,
			params: {
				_owner: account,
			},
		},
		{
			autoFetch: true,
		}
	);

	return (
		<FormControl aria-autocomplete='none'>
			<label htmlFor='rate'>
				Rate{' '}
				<Text as='span' fontSize='14'>
					/month
				</Text>
			</label>
			<InputGroup>
				<Input
					min={0}
					value={streamRate}
					onChange={(e) =>
						setStreamRate(() => (e.target.value || 0).toString())
					}
					autoComplete='new-password'
					type='number'
					id='rate'
					ref={rateInputRef}
				/>
				<InputRightAddon fontSize={12}>
					Balance{' '}
					{decimalFormatter(
						Units.FromWei(selectedTokenBalance?.toString() || 0)
					)}
				</InputRightAddon>
			</InputGroup>
			<Text as='span' fontSize='14' pl='4'>
				{/* Display Flow in /s */}
				{decimalFormatter(
					Units.FromWei(
						BigNumber.from(Units.ETH(streamRate ?? '0')).div(30 * 86400)
					)
				)}{' '}
				{(selectedToken?.symbol || '') + 'x' || 'Tokens'}/s
			</Text>
		</FormControl>
	);
};

export default RateInput;
