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
	VStack,
	Divider,
} from '@chakra-ui/react';
import numberFormatter from '../../utils/numberFormatter';
import { useNavigate } from 'react-router-dom';
import { useMoralis } from 'react-moralis';
import useDhedgePerformanceMetric from '../../hooks/useDhedgePerformanceMetric';
import PoolImage from '../PoolImage';

const PoolCard = ({ poolData }) => {
	const navigate = useNavigate();
	const { Moralis } = useMoralis();

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
				zIndex={1}
			>
				<PoolImage card imageURL={poolData?.imageURL} />

				<Heading textAlign='center' as='h5' fontSize={'lg'} fontWeight={500}>
					{poolData?.name}
				</Heading>
				<Text textAlign='center' color={'gray.500'} fontSize='sm'>
					{poolData?.managerName}
				</Text>
				<Flex
					pt={5}
					gap={6}
					width={'100%'}
					justify='space-between'
					flexDirection='column'
					align={'center'}
				>
					<HStack
						bg={useColorModeValue('gray.50', 'whiteAlpha.100')}
						w='100%'
						h='5rem'
						maxW={'35ch'}
						rounded='md'
						justify='space-around'
						p='4'
					>
						<VStack align='start' w='7ch'>
							<Text fontSize='xs' fontWeight={500} as='label'>
								TVM
							</Text>
							<Text fontSize='sm' fontWeight={500}>
								$
								{numberFormatter(
									Moralis.Units.FromWei(poolData?.totalValue || '0')
								)}
							</Text>
						</VStack>

						<Divider orientation='vertical' borderColor={'gray.500'} />

						<VStack align='start' w='7ch'>
							<Text fontSize='xs' fontWeight={500} as='label'>
								Risk Factor
							</Text>
							<Text fontSize='sm' fontWeight={500}>
								{poolData?.riskFactor}/5
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
								<Td textAlign='center'>
									{useDhedgePerformanceMetric(
										poolData?.performanceMetrics?.['month'],
										poolData?.performanceFactor
									)}
								</Td>
								<Td textAlign='center'>
									{useDhedgePerformanceMetric(
										poolData?.performanceMetrics?.['year'],
										poolData?.performanceFactor
									)}
								</Td>
								<Td textAlign='center'>
									{useDhedgePerformanceMetric(
										poolData?.performance,
										poolData?.performanceFactor
									)}
								</Td>
							</Tr>
						</Tbody>
					</Table>
					<HStack width={'100%'} justifyContent='space-evenly'>
						<Button
							colorScheme='blue'
							variant='outline'
							onClick={() =>
								navigate(`/Super-dHEDGE/?pool=${poolData?.superPoolAddress}`)
							}
						>
							Stream
						</Button>
						<Button
							onClick={() =>
								navigate(`/Super-dHEDGE/${poolData?.superPoolAddress}`)
							}
							variant={'unstyled'}
						>
							Explore
						</Button>
					</HStack>
				</Flex>
			</Box>
		</Center>
	);
};

export default PoolCard;
