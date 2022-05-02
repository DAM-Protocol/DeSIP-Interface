import {
	Grid,
	InputGroup,
	InputLeftElement,
	Input,
	Box,
} from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import PoolCard from '../layouts/PoolCard';
import InvestModal from './InvestModal/';
import { GoSearch as Search } from 'react-icons/go';
import { useContext, useEffect, useMemo } from 'react';
import { Web3Context } from '../../context/Web3Context';
const Pools = () => {
	const { pools, getDhedgePools } = useContext(Web3Context);

	useEffect(() => {
		getDhedgePools();
	}, [getDhedgePools]);

	let [searchParams] = useSearchParams();
	let poolAddress = searchParams.get('pool');

	return (
		<>
			<InvestModal isOpen={!!poolAddress} />

			{/* search box */}
			{/* <Box>
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
			</Box> */}

			<Grid
				templateColumns={'repeat(auto-fit, minmax(18rem, 1fr));'}
				gap={'4'}
				mt='16'
			>
				{pools?.map((pool) => (
					<PoolCard key={pool.id} poolData={pool?.attributes} />
				))}
			</Grid>
		</>
	);
};

export default Pools;
