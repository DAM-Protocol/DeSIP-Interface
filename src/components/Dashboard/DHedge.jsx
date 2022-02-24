import {
	Tag,
	Text,
	Box,
	useColorModeValue,
	Grid,
	Td,
	AccordionItem,
	Accordion,
	Table,
	Th,
	Tr,
	Tbody,
	Thead,
	AccordionPanel,
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
import { InternalLink } from '../Links';

const DHedge = () => {
	return (
		<Box overflowX='auto'>
			<Accordion allowMultiple mx='auto'>
				<PoolTableItem />
				<PoolTableItem />
				<PoolTableItem />
				<PoolTableItem />
			</Accordion>
		</Box>
	);
};

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
				<AccordionButton py='10' _hover={{ background: 'none' }}>
					<Grid
						templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat( 4, 1fr)' }}
						gap='4'
						rowGap='8'
						alignItems={{ base: 'end', md: 'center' }}
						m='auto'>
						<Stack
							spacing='2'
							align='center'
							direction={['column', 'row', 'row']}>
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

						<HStack justify='center' spacing='2'>
							<Tag variant={'outline'} colorScheme='green'>
								D: +10%
							</Tag>
							<Tag variant={'outline'} colorScheme='red'>
								Y: -5%
							</Tag>
						</HStack>
					</Grid>
				</AccordionButton>

				<AccordionPanel borderRadius='10' pt='6' overflow='scroll'>
					<Table size='sm' variant='unstyled'>
						<Thead>
							<Tr>
								<Th textAlign='center'>Asset</Th>
								<Th textAlign='center'>Rate</Th>
								<Th textAlign='center'>Streamed</Th>
								<Th textAlign='center'>Uninvested</Th>
								<Th textAlign='center'>Controls</Th>
							</Tr>
						</Thead>
						<Tbody>
							<Tr>
								<Td textAlign='center'>USDCx</Td>
								<Td textAlign='center'>50</Td>
								<Td textAlign='center'>1000</Td>
								<Td textAlign='center'>50</Td>
								<Td textAlign='center'>Stop | Edit</Td>
							</Tr>
							<Tr>
								<Td textAlign='center'>USDTx</Td>
								<Td textAlign='center'>40</Td>
								<Td textAlign='center'>40</Td>
								<Td textAlign='center'>500</Td>
								<Td textAlign='center'>Stop | Edit</Td>
							</Tr>
						</Tbody>
					</Table>
				</AccordionPanel>
			</AccordionItem>
		</>
	);
};

export default DHedge;
