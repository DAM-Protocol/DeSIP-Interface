import {
	Grid,
	InputGroup,
	InputLeftElement,
	Input,
	Box,
} from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import { useMoralisQuery } from 'react-moralis';
import PoolCard from '../layouts/PoolCard';
import InvestModal from './InvestModal/';
import { GoSearch as Search } from 'react-icons/go';

const Pools = () => {
	const {
		data: pools,
		error,
		isLoading,
	} = useMoralisQuery('SuperDhedgePool', (query) =>
		query.ascending('leaderboardRank').limit(25)
	);

	let [searchParams] = useSearchParams();
	let poolAddress = searchParams.get('pool');
	const openPool = pools.find((p) => p.get('superPoolAddress') === poolAddress);

	return (
		<>
			<InvestModal poolData={openPool?.attributes} isOpen={!!poolAddress} />

			<Box>
				<InputGroup m='auto' my={10} mb='14' maxWidth='60ch'>
					<InputLeftElement
						pointerEvents='none'
						mt={1}
						ml={1}
						children={<Search size={20} fill='gray' />}
					/>
					<Input
						placeholder='Search pools'
						size='lg'
						variant='filled'
						px={15}
						py={5}
					/>
				</InputGroup>
			</Box>

			<Grid templateColumns={'repeat(auto-fit, minmax(18rem, 1fr));'} gap={'4'}>
				{pools?.map((pool) => (
					<PoolCard key={pool.id} poolAttributes={pool?.attributes} />
				))}
			</Grid>
		</>
	);
};

export default Pools;
