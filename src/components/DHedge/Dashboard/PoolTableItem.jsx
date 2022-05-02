import {
	Tag,
	Text,
	useColorModeValue,
	Grid,
	VStack,
	Tooltip,
	Icon,
	Flex,
	HStack,
	Image,
	Stack,
	useDisclosure,
	Button,
	Box,
} from '@chakra-ui/react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import InvestModal from '../InvestModal';
import { InternalLink } from '../../Links';
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

			<Box
				{...border}
				my='6'
				bg={useColorModeValue('whiteAlpha.500', 'blackAlpha.400')}
			>
				<PoolAccordionButton onOpen={onOpen} poolData={poolData} />

				<PoolTablePanel></PoolTablePanel>
			</Box>
		</>
	);
};

const PoolAccordionButton = ({ onOpen, poolData }) => {
	return (
		<Box py='10' _hover={{ background: 'none' }}>
			<Grid
				w='full'
				templateColumns={{
					base: 'repeat(2, 1fr)',
					md: '1.5fr repeat( 3, 1fr)',
				}}
				gap='4'
				rowGap='8'
				alignItems={{ base: 'end' }}
				m='auto'
			>
				{/* Pool Image, Name and Invest Button */}
				<Stack
					spacing='2'
					justify='center'
					align='center'
					direction={['column', 'row', 'row']}
					alignSelf={{ base: 'end', md: 'center' }}
				>
					<Image
						boxSize='16'
						rounded={'md'}
						objectFit={'cover'}
						filter={'drop-shadow(0px 0px 5px #0000001d)'}
						src={
							'https://pbs.twimg.com/profile_images/1434774151340773384/ypAN0vSP_200x200.jpg'
						}
					/>
					<VStack>
						<InternalLink to={`/Super-dHEDGE/${poolData?.address}`}>
							{poolData?.name || 'Convex Strategies'}
						</InternalLink>
						<Button
							variant='ghost'
							onClick={(e) => e.preventDefault() || onOpen()}
							size='sm'
						>
							Invest
						</Button>
					</VStack>
				</Stack>

				{/* Pool Token Balance */}
				<VStack spacing='1'>
					<Text as='span' fontSize='sm' opacity='0.7'>
						$150
					</Text>
					<Text as='span' fontWeight='medium'>
						1,000,000
					</Text>
					<Flex fontSize='sm' opacity='0.7' as='span' align='center'>
						Balance
						<Tooltip label={`DHPTx`} hasArrow aria-label={`DHPTx`}>
							<Flex as='span' ml='2'>
								<Icon as={AiOutlineInfoCircle} w={4} h={4} />
							</Flex>
						</Tooltip>
					</Flex>
				</VStack>

				{/* Total Value Streaming */}
				<VStack spacing='1'>
					<Text as='span' fontWeight='medium'>
						$140k
					</Text>
					<Flex fontSize='sm' opacity='0.7' as='span' align='center'>
						TVS
						<Tooltip
							label='Total Value Streaming'
							hasArrow
							aria-label='Total Value Streaming'
						>
							<Flex as='span' ml='2'>
								<Icon as={AiOutlineInfoCircle} w={4} h={4} />
							</Flex>
						</Tooltip>
					</Flex>
				</VStack>

				{/* Performance Metrics */}
				<VStack spacing='1' alignSelf={{ base: 'end', md: 'center' }}>
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
		</Box>
	);
};

export default PoolTableItem;
