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
	AccordionIcon,
} from '@chakra-ui/react';

const DashboardHeader = ({ name }) => {
	return (
		<Text opacity='0.7' fontWeight={'bold'} as='div' align='center'>
			{name}
		</Text>
	);
};

const headers = [
	'Pool',
	'Balance',
	'Price (USD)',
	'Performance',
	// 'Last Deposited',
];

const DHedge = () => {
	return (
		<Box overflowX='auto'>
			<Grid
				mx='auto'
				templateColumns={'3ch 25ch 15ch 15ch 20ch'}
				gap='4'
				py='4'
				width={'fit-content'}>
				<span></span>
				{headers.map((header, index) => (
					<DashboardHeader key={index} name={header} />
				))}
			</Grid>

			<Accordion allowMultiple width={'fit-content'} mx='auto'>
				<PoolTableItem />
				<PoolTableItem />
				<PoolTableItem />
				<PoolTableItem />
			</Accordion>
		</Box>
	);
};

const PoolTableItem = () => {
	const border = {
		borderWidth: '1px',
		borderRadius: '10',
		borderStyle: 'solid',
		borderColor: useColorModeValue('gray.200', 'blue.800'),
		borderBottom: '1px solid',
		borderBottomColor: useColorModeValue('gray.200', 'blue.800'),
	};

	return (
		<AccordionItem
			{...border}
			my='2'
			bg={useColorModeValue('whiteAlpha.500', 'blackAlpha.400')}>
			<AccordionButton width={'fit-content'} py='4'>
				<Grid templateColumns={'3ch 25ch 15ch 15ch 20ch'} gap='4'>
					<AccordionIcon />

					<Text>Convex Strategies</Text>
					<Text>1,000,000 CST</Text>
					<Text>$1.00</Text>
					<Text>
						<Tag variant={'outline'} colorScheme='green' mr='1'>
							D: +10%
						</Tag>
						<Tag variant={'outline'} colorScheme='red'>
							Y: -5%
						</Tag>
					</Text>
					{/* <Text>14/02/2022</Text> */}
				</Grid>
			</AccordionButton>

			<AccordionPanel pl='6ch' borderRadius='10'>
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
	);
};

export default DHedge;
