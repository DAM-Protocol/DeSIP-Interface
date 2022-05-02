import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Flex,
	useColorModeValue,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	useMediaQuery,
	Box,
} from '@chakra-ui/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CreateStream from './CreateStream';
import PoolDetails from '../PoolDetails';
import { useContext, useMemo } from 'react';
import { Web3Context } from '../../../context/Web3Context';

const InvestModal = ({ isOpen, onClose }) => {
	const { pools } = useContext(Web3Context);

	let [searchParams] = useSearchParams();
	let poolAddress = searchParams.get('pool');
	const poolData = useMemo(
		() =>
			pools?.find((p) => p.get('superPoolAddress') === poolAddress)?.attributes,
		[pools, poolAddress]
	);

	const navigate = useNavigate();
	const closeModal = () => {
		if (onClose) onClose();
		else navigate(`/Super-dHEDGE/`);
	};

	const [isViewWidthSmall] = useMediaQuery('(max-width: 768px)');

	return (
		<Modal
			isOpen={isOpen}
			onClose={closeModal}
			scrollBehavior={'inside'}
			size='5xl'
			isCentered
			blockScrollOnMount
		>
			<ModalOverlay />
			<ModalContent
				height='80%'
				background={useColorModeValue('white', 'bg.dark.900')}
				borderWidth='1px'
				borderColor={useColorModeValue('gray.200', 'blue.700')}
			>
				<ModalHeader textAlign={'center'} fontSize='2xl'>
					Start New Stream
				</ModalHeader>

				<ModalCloseButton />

				<ModalBody py='4' pb='8' px={{ md: '6', sm: '0' }}>
					{isViewWidthSmall ? (
						<Tabs isFitted variant='enclosed-colored' colorScheme='blue'>
							<TabList mb='1rem'>
								<Tab>Pool</Tab>
								<Tab>Invest</Tab>
							</TabList>

							<TabPanels>
								<TabPanel>
									<PoolDetails poolData={poolData} />
								</TabPanel>

								<TabPanel>
									<Box w='100%'>
										<CreateStream poolData={poolData} />
									</Box>
								</TabPanel>
							</TabPanels>
						</Tabs>
					) : (
						<Flex height={'100%'}>
							<PoolDetails poolData={poolData} />

							<Box w='50%'>
								<CreateStream poolData={poolData} />
							</Box>
						</Flex>
					)}
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default InvestModal;
