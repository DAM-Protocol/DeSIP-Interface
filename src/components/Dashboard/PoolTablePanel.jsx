import {
	Td,
	Table,
	Th,
	Tr,
	Tbody,
	Thead,
	AccordionPanel,
} from '@chakra-ui/react';

const PoolTablePanel = ({}) => {
	return (
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
	);
};

export default PoolTablePanel;
