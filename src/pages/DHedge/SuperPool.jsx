import {
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
	Stack,
	useColorModeValue,
	VStack,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import Page from '../../components/layouts/Page';
import PoolDetails from '../../components/DHedge/PoolDetails';
import { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../../context/Web3Context';
import { useMoralisQuery } from 'react-moralis';
import AssetTable from '../../components/DHedge/Dashboard/AssetTable';
import CreateStream from '../../components/DHedge/InvestModal/CreateStream';

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

	const [defaultSelectedToken, setDefaultSelectedToken] = useState();
	return (
		<Page bg>
			<Stack
				direction={['column', 'row']}
				wrap='wrap'
				spacing='0'
				align={'start'}
				height='calc(100vh - 10rem)'
				maxH='2xl'
			>
				<PoolDetails poolData={poolData} />

				<VStack
					w={{ base: '100%', md: '50%' }}
					px='4'
					h='100%'
					as={Tabs}
					isFitted
					colorScheme='blue'
					spacing='0'
				>
					<TabList w='100%'>
						<Tab borderRadius='sm'>Active Streams</Tab>
						<Tab borderRadius='sm'>New Stream</Tab>
					</TabList>

					<TabPanels
						h='100%'
						border='1px solid'
						borderColor={useColorModeValue('gray.200', 'blue.800')}
						borderRadius='md'
						bg={useColorModeValue('whiteAlpha.400', 'blackAlpha.400')}
						flex='1'
					>
						<TabPanel overflow='auto' h='100%'>
							<AssetTable poolAssets={{}} />
						</TabPanel>
						<TabPanel h='100%'>
							<CreateStream
								poolData={poolData}
								defaultSelectedToken={defaultSelectedToken}
							/>
						</TabPanel>
					</TabPanels>
				</VStack>
			</Stack>
		</Page>
	);
};

export default SuperPool;
