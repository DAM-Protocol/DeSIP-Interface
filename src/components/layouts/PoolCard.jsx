import {
	Heading,
	Center,
	Box,
	useColorModeValue,
	Flex,
	Text,
	Button,
	HStack,
	Table,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
	Tooltip,
	VStack,
	Divider,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import PoolImage from '../PoolImage';

const PoolCard = ({ imageURL, children, name }) => {
	const navigate = useNavigate();

	return (
		<Center py={6} minW={'200px'}>
			<Box
				border={'1px solid'}
				borderColor={useColorModeValue('gray.100', 'blue.800')}
				role={'group'}
				p={6}
				maxW={'360px'}
				w={'full'}
				bg={useColorModeValue('white', 'blackAlpha.500')}
				boxShadow={'xl'}
				rounded={'lg'}
				pos={'relative'}
				zIndex={1}>
				<PoolImage imageURL={imageURL} />

				<Heading textAlign='center' as='h5' fontSize={'lg'} fontWeight={500}>
					{name}
				</Heading>
				<Text textAlign='center' color={'gray.500'} fontSize='sm'>
					CM
				</Text>
				<Flex
					pt={5}
					gap={6}
					width={'100%'}
					justify='space-between'
					flexDirection='column'
					align={'center'}>
					<HStack
						bg={useColorModeValue('gray.50', 'whiteAlpha.100')}
						w='100%'
						h='5rem'
						maxW={'35ch'}
						rounded='md'
						justify='space-around'
						p='4'>
						<VStack align='start'>
							<Text fontSize='xs' fontWeight={500} as='label'>
								TVM
							</Text>
							<Text fontSize='sm' fontWeight={500}>
								$124.75K
							</Text>
						</VStack>
						<Divider orientation='vertical' borderColor={'gray.500'} />
						<VStack align='start'>
							<Text fontSize='xs' fontWeight={500} as='label'>
								Risk Factor
							</Text>
							<Text fontSize='sm' fontWeight={500}>
								4/5
							</Text>
						</VStack>
					</HStack>

					<Table variant='simple' size='sm'>
						<Thead>
							<Tr>
								<Th textAlign='center'>Month</Th>
								<Th textAlign='center'>Year</Th>
								<Th textAlign='center'>All Time</Th>
							</Tr>
						</Thead>
						<Tbody>
							<Tr>
								<Td textAlign='center'>10%</Td>
								<Td textAlign='center'>-2%</Td>
								<Td textAlign='center'>5%</Td>
							</Tr>
						</Tbody>
					</Table>
					<HStack width={'100%'} justifyContent='space-evenly'>
						<Button
							colorScheme='blue'
							variant='outline'
							onClick={() => navigate(`/Super-dHEDGE/?pool=df`)}>
							Stream
						</Button>
						<Button
							onClick={() =>
								navigate(
									`/Super-dHEDGE/${'0x144df3929ae3af097585534135454f7fbcce0c1e'}`
								)
							}
							variant={'unstyled'}>
							Explore
						</Button>
					</HStack>
				</Flex>
			</Box>
		</Center>
	);
};

export default PoolCard;
