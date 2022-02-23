import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Tooltip,
	Tag,
	Text,
	Box,
	useDisclosure,
	useColorModeValue,
	Grid,
	GridItem,
} from '@chakra-ui/react';

const DHedge = () => {
	return (
		<Box overflowX='auto'>
			<Table
				sx={{
					borderCollapse: 'separate',
					borderSpacing: '0 15px',
				}}>
				<Thead>
					<Tr>
						<Th w='3ch'>#</Th>
						<Th>Pool</Th>
						<Th>Balance</Th>
						<Th>Price</Th>
						<Th>Performance</Th>
						<Th w='20ch'>
							<Tooltip
								label='Last time stream tokens were deposited'
								placement='top'
								hasArrow
								aria-label='Last deposited'>
								<Text as='span'>Last deposited</Text>
							</Tooltip>
						</Th>
					</Tr>
				</Thead>

				<PoolTableBody />
			</Table>
		</Box>
	);
};
const PoolTableBody = () => {
	return (
		<Tbody>
			<PoolTableItem />
			<PoolTableItem />
			<PoolTableItem />
			<PoolTableItem />
		</Tbody>
	);
};

const PoolTableItem = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const bg = useColorModeValue(
		isOpen && 'blackAlpha.100',
		isOpen && 'whiteAlpha.100'
	);
	return (
		<>
			<Tr
				bg={bg}
				onClick={() => (isOpen ? onClose() : onOpen())}
				cursor='pointer'
				_hover={{
					bg: useColorModeValue('blackAlpha.50', 'whiteAlpha.50'),
				}}>
				<Td>1</Td>
				<Td>Convex Strategies</Td>
				<Td>1,000,000 CST</Td>
				<Td>$1.00</Td>
				<Td>
					<Tag variant={'outline'} colorScheme='green' mr='1'>
						D: +10%
					</Tag>
					<Tag variant={'outline'} colorScheme='red'>
						Y: -5%
					</Tag>
				</Td>
				<Td isNumeric>14/02/2022</Td>
			</Tr>
			{isOpen && (
				<Tr bg={bg} position='relative'>
					<Td colSpan={'6'}>
						<Grid templateRows='' rowGap='4' textAlign='center'>
							<Grid templateColumns={'repeat(4,1fr)'}>
								<GridItem>Asset</GridItem>
								<GridItem>Streamed</GridItem>
								<GridItem>Uninvested</GridItem>
								<GridItem>Controls</GridItem>
							</Grid>
							<Grid templateColumns={'repeat(4,1fr)'}>
								<GridItem>USDCx</GridItem>
								<GridItem>1000</GridItem>
								<GridItem>50</GridItem>
								<GridItem>Stop | Edit</GridItem>
							</Grid>
						</Grid>
					</Td>
				</Tr>
			)}
		</>
	);
};

export default DHedge;
