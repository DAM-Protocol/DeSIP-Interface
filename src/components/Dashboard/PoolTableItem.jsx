import {
	Tag,
	Text,
	useColorModeValue,
	Grid,
	AccordionItem,
	AccordionButton,
	VStack,
	Tooltip,
	Icon,
	Flex,
	HStack,
	Image,
	Stack,
	useDisclosure,
	Button,
} from '@chakra-ui/react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import InvestModal from '../DHedge/InvestModal';
import PoolTablePanel from './PoolTablePanel';

const PoolTableItem = ({ poolData }) => {
	const border = {
		borderWidth: '1px',
		borderRadius: '10',
		borderStyle: 'solid',
		borderColor: useColorModeValue('gray.200', 'blue.800'),
		borderBottom: '1px solid',
		borderBottomColor: useColorModeValue('gray.200', 'blue.800'),
	};
	const { onClose, isOpen, onOpen } = useDisclosure();

	return (
		<>
			<InvestModal poolData={poolData} isOpen={isOpen} onClose={onClose} />

			<AccordionItem
				{...border}
				my='6'
				bg={useColorModeValue('whiteAlpha.500', 'blackAlpha.400')}>
				<PoolAccordionButton onOpen={onOpen} poolData={poolData} />

				<PoolTablePanel></PoolTablePanel>
			</AccordionItem>
		</>
	);
};

const PoolAccordionButton = ({ onOpen, poolData }) => {
	return (
		<AccordionButton py='10' _hover={{ background: 'none' }}>
			<Grid
				templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat( 4, 1fr)' }}
				gap='4'
				rowGap='8'
				alignItems={{ base: 'end' }}
				m='auto'>
				<Stack spacing='2' align='center' direction={['column', 'row', 'row']}>
					<Image
						boxSize='16'
						rounded={'md'}
						objectFit={'cover'}
						filter={'drop-shadow(0px 0px 5px #0000001d)'}
						src={
							'https://pbs.twimg.com/profile_images/1434774151340773384/ypAN0vSP_200x200.jpg'
						}
					/>
					<Button fontWeight='medium' variant='ghost' onClick={onOpen}>
						Convex Strategies
					</Button>
				</Stack>

				<VStack spacing='1'>
					<Text as='span' fontSize='sm' opacity='0.7'>
						$150
					</Text>
					<Text as='span' fontWeight='medium'>
						1,000,000
					</Text>
					<Flex fontSize='sm' opacity='0.7' as='span' align='center'>
						Balance
						<Tooltip
							label={`Balance Pool Super Tokens ${poolData?.poolTokenSymbol}`}
							placement='top'
							hasArrow
							aria-label={`Balance Pool Super Tokens ${poolData?.poolTokenSymbol}`}>
							<Flex as='span' ml='2'>
								<Icon as={AiOutlineInfoCircle} w={4} h={4} />
							</Flex>
						</Tooltip>
					</Flex>
				</VStack>

				<VStack spacing='1'>
					<Text as='span' fontWeight='medium'>
						$140k
					</Text>
					<Flex fontSize='sm' opacity='0.7' as='span' align='center'>
						TVS
						<Tooltip
							label='Total Value Streaming'
							placement='top'
							hasArrow
							aria-label='Total Value Streaming'>
							<Flex as='span' ml='2'>
								<Icon as={AiOutlineInfoCircle} w={4} h={4} />
							</Flex>
						</Tooltip>
					</Flex>
				</VStack>

				<VStack spacing='1'>
					<HStack justify='center' spacing='2'>
						<Tag variant='outline' p='4' py='2' colorScheme='green'>
							+10%
							<br />
							Day
						</Tag>
						<Tag variant='outline' p='4' py='2' colorScheme='red'>
							-5% <br />
							Year
						</Tag>
					</HStack>
				</VStack>
			</Grid>
		</AccordionButton>
	);
};

export default PoolTableItem;
