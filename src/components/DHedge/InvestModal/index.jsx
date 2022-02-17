import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Flex,
	Divider,
	useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import CreateStream from './CreateStream';
import PoolDetails from './PoolDetails';

const InvestModal = ({ poolData = dummyData, isOpen }) => {
	const navigate = useNavigate();
	const closeModal = () => {
		navigate(`/Super-dHEDGE/`);
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={closeModal}
			size='5xl'
			isCentered
			blockScrollOnMount>
			<ModalOverlay />
			<ModalContent
				maxHeight='85%'
				bg={useColorModeValue('white', 'brand.darkBg.900')}
				borderWidth='1px'
				borderColor={useColorModeValue('gray.200', 'blue.700')}>
				<ModalHeader textAlign={'center'} fontSize='2xl'>
					Start Streaming
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody py='4' pb='8'>
					<Flex height={'100%'}>
						<PoolDetails poolData={poolData} />
						<CreateStream />
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

const dummyData = {
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
};

export default InvestModal;
