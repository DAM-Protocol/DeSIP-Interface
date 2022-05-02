import {
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
	Stack,
	Box,
	useColorModeValue,
	VStack,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import Page from '../../components/layouts/Page';
import CreateStream from '../../components/DHedge/InvestModal/CreateStream';
import PoolDetails from '../../components/DHedge/PoolDetails';
import ActiveStreams from '../../components/DHedge/SuperPool/ActiveStreams';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Web3Context } from '../../context/Web3Context';
import { useMoralisQuery } from 'react-moralis';

const SuperPool = () => {
	const { pools } = useContext(Web3Context);
	const { poolAddress } = useParams();

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

	return (
		<Page bg>
			<Stack direction={['column', 'row']} wrap='wrap' spacing='0'>
				<PoolDetails poolData={poolData} />

				<Box w={{ base: '100%', md: '50%' }}>
					<VStack as={Tabs} isFitted colorScheme='blue' h='100%' spacing='0'>
						<TabList w='100%'>
							<Tab>Active Streams</Tab>
							<Tab>Invest</Tab>
						</TabList>

						<TabPanels
							border='1px solid'
							borderColor={useColorModeValue('gray.200', 'blue.800')}
							borderRadius='md'
							bg={useColorModeValue('whiteAlpha.400', 'blackAlpha.400')}
							flex='1'
						>
							<TabPanel>
								<ActiveStreams />
							</TabPanel>
							<TabPanel>
								<CreateStream poolData={poolData} />
							</TabPanel>
						</TabPanels>
					</VStack>
				</Box>
			</Stack>
		</Page>
	);
};

export default SuperPool;
