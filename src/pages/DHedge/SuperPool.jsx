import {
	Box,
	Button,
	Divider,
	HStack,
	Spacer,
	Stack,
	Stat,
	StatArrow,
	StatGroup,
	StatHelpText,
	StatLabel,
	StatNumber,
	Text,
	useColorModeValue,
	useDisclosure,
	VStack,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import Page from '../../components/layouts/Page';
import PoolDetails from '../../components/DHedge/PoolDetails';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Web3Context } from '../../context/Web3Context';
import { useMoralis, useMoralisQuery } from 'react-moralis';
import AssetTable from '../../components/DHedge/Dashboard/AssetTable';
import CreateStream from '../../components/DHedge/InvestModal/CreateStream';
import ModalLayout from '../../components/layouts/ModalLayout';
import numberFormatter from '../../utils/numberFormatter';

const SuperPool = () => {
	const { pools } = useContext(Web3Context);
	const { poolAddress } = useParams();
	const { Moralis } = useMoralis();

	const {
		fetch: getDhedgePool,
		data: superDhedgePool,
		error: superDhedgePoolError,
		isLoading: isLoadingSuperDhedgePool,
	} = useMoralisQuery(
		'SuperDhedgePool',
		(query) => query.equalTo('superPoolAddress', poolAddress).limit(1),
		[poolAddress],
		{
			autoFetch: false,
		}
	);
	const [poolData, setPoolData] = useState({});

	useEffect(() => {
		const pool = pools?.find((p) => p.get('superPoolAddress') === poolAddress);
		if (pool) {
			setPoolData(pool.attributes);
		} else {
			getDhedgePool().then((res) => {
				setPoolData(res?.[0]?.attributes);
			});
		}
	}, [poolAddress]);

	const [defaultSelectedToken, setDefaultSelectedToken] = useState();
	const percentagePriceChange = useMemo(() => {
		const curPrice = Moralis.Units.FromWei(poolData?.adjustedTokenPrice || 0);
		const prevPrice = Moralis.Units.FromWei(
			poolData?.prevAdjustedTokenPrice?.price || 0
		);
		return (((curPrice - prevPrice) / curPrice) * 100).toFixed(2);
	}, [Moralis, poolData]);

	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Page bg>
			<Stack
				direction={{ xl: 'column', base: 'row' }}
				wrap='wrap'
				spacing='0'
				justify={{ xl: 'start', base: 'center' }}
				height='calc(100vh - 12rem)'
				maxH='xl'
			>
				<PoolDetails poolData={poolData} />

				<VStack
					w={{ base: '100%', lg: '50%' }}
					p='4'
					py='6'
					h='100%'
					bg={useColorModeValue('bg.white.50', 'bg.dark.950')}
					border='1px solid'
					borderColor={useColorModeValue('gray.200', 'blue.800')}
					borderRadius='md'
				>
					<HStack w='100%' align='end'>
						<StatGroup w='100%' px='10' py='6' zIndex='9'>
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

					<Divider />
					<Box overflow='auto' w='100%'>
						<AssetTable poolAssets={{}} />
					</Box>

					<Spacer />
					<HStack>
						<Button onClick={onOpen} py='4' colorScheme='blue'>
							New Stream
						</Button>
						<Button py='4' colorScheme='blue' variant='ghost'>
							Withdraw
						</Button>
					</HStack>
					<ModalLayout
						isOpen={isOpen}
						onClose={onClose}
						size='md'
						header={defaultSelectedToken ? 'Edit Stream' : 'New Stream'}
					>
						<CreateStream
							poolData={poolData}
							defaultSelectedToken={defaultSelectedToken}
						/>
					</ModalLayout>
				</VStack>
			</Stack>
		</Page>
	);
};

export default SuperPool;
