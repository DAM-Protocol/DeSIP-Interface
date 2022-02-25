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

const SuperPool = () => {
	const { poolAddress } = useParams();

	return (
		<Page>
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
							flex='1'>
							<TabPanel>
								<ActiveStreams />
							</TabPanel>
							<TabPanel>
								<CreateStream />
							</TabPanel>
						</TabPanels>
					</VStack>
				</Box>
			</Stack>
		</Page>
	);
};

export default SuperPool;

// Dummy Data
const poolData = {
	imageURL:
		'https://pbs.twimg.com/profile_images/1417404802821152798/7kLneVlp_200x200.jpg',
	address: '0x144df3929ae3af097585534135454f7fbcce0c1e',
	managerName: 'Crypto Family Capital',
	name: 'Crypto Family Pool',
	poolDetails: null,
	leaderboardRank: 63,
	riskFactor: 3,
	totalValue: '6798026087732035300312',
	performanceFactor: '1000000000000000000',
	performance: '1579695289378430345',
	performanceMetrics: {
		day: '1000170777382778131',
		month: '1004364149411701403',
		year: '1579754734930654181',
		quarter: '978397687970010176',
		week: '1000262012357288639',
		halfyear: '1553159587044043575',
	},
	assets: [
		{
			name: 'BTC',
			icon: 'https://dhedge.org/assets/images/icons/btc.svg',
		},
		{
			name: 'USDC',
			icon: 'https://app.dhedge.org/static/media/usdc.c8fcab48.svg',
		},
	],
};
