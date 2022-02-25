import {
	Td,
	Table,
	Th,
	Tr,
	Tbody,
	Thead,
	AccordionPanel,
	Badge,
	Button,
	Icon,
	Text,
	Divider,
} from '@chakra-ui/react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

const PoolTablePanel = ({ poolAssets }) => {
	return (
		<AccordionPanel borderRadius='10' pt='6' overflow='scroll'>
			<Divider mb='4' mt='-6' />
			<Table size='sm' variant='unstyled'>
				<Thead>
					<Tr>
						<Th textAlign='center'>Asset</Th>
						<Th textAlign='center'>
							Rate{' '}
							<Text as='sub' opacity='0.7'>
								(/month)
							</Text>{' '}
						</Th>
						<Th textAlign='center'>Streamed</Th>
						<Th textAlign='center'>Uninvested</Th>
						<Th textAlign='center'>Controls</Th>
					</Tr>
				</Thead>
				<Tbody>
					<AssetRow assetData={poolAssets?.assetData} />
					<AssetRow assetData={poolAssets?.assetData} />
				</Tbody>
			</Table>
		</AccordionPanel>
	);
};

const AssetRow = () => {
	return (
		<Tr>
			<Td textAlign='center'>
				<Badge borderRadius={'sm'} p='2' colorScheme='red'>
					USDTx
				</Badge>
			</Td>
			<Td textAlign='center'>40</Td>
			<Td textAlign='center'>40</Td>
			<Td textAlign='center'>500</Td>
			<Td textAlign='center'>
				<Button variant='ghost' colorScheme='yellow' p='2'>
					<Icon as={AiOutlineEdit}></Icon>
				</Button>{' '}
				<Button variant='ghost' colorScheme='red' p='2'>
					<Icon as={AiOutlineDelete}></Icon>
				</Button>
			</Td>
		</Tr>
	);
};

export default PoolTablePanel;
