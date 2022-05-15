import {
	HStack,
	Stat,
	StatArrow,
	StatGroup,
	StatHelpText,
	StatLabel,
	StatNumber,
} from '@chakra-ui/react';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { Web3Context } from '../../context/Web3Context';
import numberFormatter from '../../utils/numberFormatter';

/* DHPT Balance and Token Price Data */
const DhptStats = ({
	adjustedTokenPrice,
	poolSuperToken,
	prevAdjustedTokenPrice,
}) => {
	const { Moralis, account } = useMoralis();
	const { sf, sfProvider } = useContext(Web3Context);

	const percentagePriceChange = useMemo(() => {
		const curPrice = Moralis.Units.FromWei(adjustedTokenPrice || 0);
		const prevPrice = Moralis.Units.FromWei(prevAdjustedTokenPrice?.price || 0);
		return (((curPrice - prevPrice) / curPrice) * 100).toFixed(2);
	}, [Moralis, adjustedTokenPrice, prevAdjustedTokenPrice?.price]);

	const [balance, setBalance] = useState();

	const calcDhptxBalance = useCallback(async () => {
		if (sf && account && poolSuperToken) {
			const dhptx = await sf.loadSuperToken(poolSuperToken);
			await dhptx
				.balanceOf({
					account: account,
					providerOrSigner: sfProvider,
				})
				.then((balance) => setBalance(Moralis.Units.FromWei(balance)));
		}
	}, [Moralis, account, poolSuperToken, sf, sfProvider]);
	useEffect(() => {
		calcDhptxBalance();
	}, [calcDhptxBalance]);

	return (
		<HStack w='100%' align='end'>
			<StatGroup w='100%' px={{ base: '4', md: '10' }} py='6' zIndex='9'>
				<Stat>
					<StatLabel color='gray.400'>Balance&nbsp;(DHPTx)</StatLabel>

					<StatNumber fontSize='xl'>
						$&nbsp;{numberFormatter(balance)}
					</StatNumber>
					<StatHelpText>
						$&nbsp;
						{numberFormatter(
							Moralis.Units.FromWei(adjustedTokenPrice || '0') * balance
						)}
					</StatHelpText>
				</Stat>
			</StatGroup>

			<StatGroup w='100%' px={{ base: '4', md: '10' }} py='6' zIndex='9'>
				<Stat>
					<StatLabel color='gray.400'>Token Price</StatLabel>
					<StatNumber fontSize='xl'>
						$&nbsp;
						{numberFormatter(
							Moralis.Units.FromWei(adjustedTokenPrice || '0'),
							2
						)}
					</StatNumber>
					<StatHelpText>
						{percentagePriceChange}%&nbsp;
						<StatArrow
							type={percentagePriceChange >= 0 ? 'increase' : 'decrease'}
						/>
					</StatHelpText>
				</Stat>
			</StatGroup>
		</HStack>
	);
};

export default DhptStats;
