import { ExternalLink } from '../Links';
import { FiExternalLink } from 'react-icons/fi';
import {
	Text,
	Flex,
	Box,
	useColorModeValue,
	HStack,
	Table,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
	Icon,
	Image,
	VStack,
	Heading,
	Divider,
} from '@chakra-ui/react';
import AssetTag from '../AssetTag';
import PoolImage from '../PoolImage';
import useDhedgePerformanceMetric from '../../hooks/useDhedgePerformanceMetric';
import numberFormatter from '../../utils/numberFormatter';
import { useMoralis } from 'react-moralis';
import { useContext } from 'react';
import { Web3Context } from '../../context/Web3Context';

const PoolDetails = ({ poolData }) => {
	const { Moralis } = useMoralis();
	const { assetLookup } = useContext(Web3Context);

	return (
		<Flex
			mb='6'
			w={{ base: '100%', md: '50%' }}
			h='100%'
			direction='column'
			justify='space-between'
			align='center'
			gap='8'
			overflow='auto'
			px='4'
			alignSelf='center'
		>
			<HStack
				pos={'relative'}
				maxW={'100%'}
				spacing={2}
				direction='column'
				align={'center'}
				gap='4'
			>
				<PoolImage imageURL={poolData?.imageURL} />
				<VStack align='flex-start'>
					<Heading as='h6' fontSize={'xl'} fontWeight={500}>
						{poolData?.name}
					</Heading>

					<Text color={'gray.500'} fontSize='sm'>
						{poolData?.managerName}
					</Text>
				</VStack>
			</HStack>

			{/* Supported Assets */}
			<Box>
				<Text as='div' mb='2' textAlign='center'>
					Assets Supported
				</Text>
				<HStack
					spacing={4}
					w='100%'
					maxWidth={{ base: '40ch' }}
					m='auto'
					wrap='wrap'
				>
					{poolData?.supportedDepositTokens?.map((tokenAddress) => (
						<AssetTag
							key={tokenAddress}
							name={assetLookup[tokenAddress]?.name}
							icon={assetLookup[tokenAddress]?.imageURL}
						/>
					))}
				</HStack>
			</Box>

			<Flex
				gap={8}
				width={'100%'}
				maxW='50ch'
				justify='space-between'
				flexDirection='column'
				align={'center'}
			>
				<HStack
					bg={useColorModeValue('blackAlpha.50', 'whiteAlpha.50')}
					w='100%'
					h='5rem'
					maxW={'35ch'}
					rounded='md'
					justify='space-around'
					p='4'
				>
					<VStack align='start'>
						<Text fontSize='sm' fontWeight={400} as='label'>
							TVM
						</Text>
						<Text fontSize='lg' fontWeight={600}>
							$
							{numberFormatter(
								Moralis.Units.FromWei(poolData?.totalValue || '0')
							)}
						</Text>
					</VStack>
					<Divider orientation='vertical' borderColor={'gray.500'} />
					<VStack align='start'>
						<Text fontSize='sm' fontWeight={400} as='label'>
							Risk Factor
						</Text>
						<Text fontSize='lg' fontWeight={600}>
							{poolData?.riskFactor}/5
						</Text>
					</VStack>
				</HStack>

				<Table variant='simple' size='sm'>
					<Thead>
						<Tr>
							<Th textAlign='center'>1M</Th>
							<Th textAlign='center'>6M</Th>
							<Th textAlign='center'>1Y</Th>
							<Th textAlign='center'>All</Th>
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
									poolData?.performanceMetrics?.['halfyear'],
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
			</Flex>

			<Flex width={'100%'} justifyContent='space-evenly'>
				<ExternalLink
					color={useColorModeValue('blue.700', 'blue.500')}
					href={`https://app.dhedge.org/pool/${poolData?.dhedgeFundAddress}`}
				>
					Visit dHEDGE Pool <Icon as={FiExternalLink} />
				</ExternalLink>
			</Flex>
		</Flex>
	);
};
export default PoolDetails;
