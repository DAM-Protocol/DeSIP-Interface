import { Flex, useDisclosure } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import PoolCard from '../layouts/PoolCard';
import InvestModal from './InvestModal/';

const Pools = () => {
	const { onClose } = useDisclosure();

	const pools = [{}];

	let [searchParams] = useSearchParams();
	let pool = searchParams.get('pool');

	return (
		<>
			<InvestModal poolData={pools?.[pool]} isOpen={pool} onClose={onClose} />

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
				<PoolCard
					name={'Convex Strategies'}
					imageURL={
						'https://pbs.twimg.com/profile_images/1434774151340773384/ypAN0vSP_200x200.jpg'
					}
				/>
			</Flex>
		</>
	);
};

export default Pools;
