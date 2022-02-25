import {
	Grid,
	InputGroup,
	InputLeftElement,
	useDisclosure,
	Input,
	Box,
} from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import PoolCard from '../layouts/PoolCard';
import InvestModal from './InvestModal/';
import { GoSearch as Search } from 'react-icons/go';

const Pools = () => {
	const { onClose } = useDisclosure();

	const pools = [{}];

	let [searchParams] = useSearchParams();
	let pool = searchParams.get('pool');

	return (
		<>
			<InvestModal poolData={pools?.[pool]} isOpen={pool} />

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
				<PoolCard
					name={'Convex Strategies'}
					imageURL={
						'https://pbs.twimg.com/profile_images/1434774151340773384/ypAN0vSP_200x200.jpg'
					}
				/>
				<PoolCard
					name={'Convex Strategies'}
					imageURL={
						'https://pbs.twimg.com/profile_images/1434774151340773384/ypAN0vSP_200x200.jpg'
					}
				/>
				<PoolCard
					name={'Convex Strategies'}
					imageURL={
						'https://pbs.twimg.com/profile_images/1434774151340773384/ypAN0vSP_200x200.jpg'
					}
				/>
				<PoolCard
					name={'Convex Strategies'}
					imageURL={
						'https://pbs.twimg.com/profile_images/1434774151340773384/ypAN0vSP_200x200.jpg'
					}
				/>
				<PoolCard
					name={'Convex Strategies'}
					imageURL={
						'https://pbs.twimg.com/profile_images/1434774151340773384/ypAN0vSP_200x200.jpg'
					}
				/>
				<PoolCard
					name={'Convex Strategies'}
					imageURL={
						'https://pbs.twimg.com/profile_images/1434774151340773384/ypAN0vSP_200x200.jpg'
					}
				/>
				<PoolCard
					name={'Convex Strategies'}
					imageURL={
						'https://pbs.twimg.com/profile_images/1434774151340773384/ypAN0vSP_200x200.jpg'
					}
				/>
				<PoolCard
					name={'Convex Strategies'}
					imageURL={
						'https://pbs.twimg.com/profile_images/1434774151340773384/ypAN0vSP_200x200.jpg'
					}
				/>
			</Grid>
		</>
	);
};

export default Pools;
