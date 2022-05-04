import {
	HStack,
	Stat,
	StatArrow,
	StatGroup,
	StatHelpText,
	StatLabel,
	StatNumber,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { useMoralis } from 'react-moralis';
import numberFormatter from '../../utils/numberFormatter';

/* DHPT Balance and Token Price Data */
const DhptStats = ({ poolData }) => {
	const { Moralis } = useMoralis();

	const percentagePriceChange = useMemo(() => {
		const curPrice = Moralis.Units.FromWei(poolData?.adjustedTokenPrice || 0);
		const prevPrice = Moralis.Units.FromWei(
			poolData?.prevAdjustedTokenPrice?.price || 0
		);
		return (((curPrice - prevPrice) / curPrice) * 100).toFixed(2);
	}, [Moralis, poolData]);

	return (
		<HStack w='100%' align='end'>
			<StatGroup w='100%' px={{ base: '4', md: '10' }} py='6' zIndex='9'>
				<Stat>
					<StatLabel color='gray.400'>Balance (DHPTx)</StatLabel>

					<StatNumber fontSize='xl'>$ 345,670</StatNumber>
					<StatHelpText>$ 2134</StatHelpText>
				</Stat>
			</StatGroup>
			<StatGroup w='100%' px='10' py='6' zIndex='9'>
				<Stat>
					<StatLabel color='gray.400'>Token Price</StatLabel>
					<StatNumber fontSize='xl'>
						${' '}
						{numberFormatter(
							Moralis.Units.FromWei(poolData?.adjustedTokenPrice || '0'),
							2
						)}
					</StatNumber>
					<StatHelpText>
						{percentagePriceChange}%
						<StatArrow
							type={percentagePriceChange >= 0 ? 'increase' : 'decrease'}
							ml='4'
						/>
					</StatHelpText>
				</Stat>
			</StatGroup>
		</HStack>
	);
};

export default DhptStats;
