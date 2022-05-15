import {
	Box,
	Button,
	Divider,
	HStack,
	Spacer,
	useColorModeValue,
	useDisclosure,
	VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import StreamTable from './Dashboard/StreamTable';
import CreateStream from './InvestModal/CreateStream';
import ModalLayout from '../layouts/ModalLayout';

import DhptStats from './DhptStats';

const UserPoolData = ({ poolData }) => {
	const [defaultSelectedToken, setStreamToken] = useState();

	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<VStack
			w={{ base: '100%', lg: '50%' }}
			p='4'
			py='6'
			h='xl'
			bg={useColorModeValue('bg.white.50', 'bg.dark.950')}
			border='1px solid'
			borderColor={useColorModeValue('gray.200', 'blue.800')}
			borderRadius='md'
			maxH='xl'
		>
			<DhptStats
				adjustedTokenPrice={poolData?.adjustedTokenPrice}
				poolSuperToken={poolData?.superToken}
				prevAdjustedTokenPrice={poolData?.prevAdjustedTokenPrice}
			/>

			<Divider />

			{/* all streams to the pool and their data */}
			<Box overflow='auto' w='100%'>
				<StreamTable poolData={poolData} setStreamToken={setStreamToken} />
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

			{/* Modal for creating/editing streams */}
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
	);
};

export default UserPoolData;
