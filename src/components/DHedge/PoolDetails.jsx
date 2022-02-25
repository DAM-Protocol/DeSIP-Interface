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
	Tooltip,
	Icon,
	Image,
	VStack,
	Heading,
} from '@chakra-ui/react';
import AssetTag from '../AssetTag';

const PoolDetails = ({ poolData }) => {
	return (
		<Flex
			mb='6'
			w={{ base: '100%', md: '50%' }}
			direction='column'
			justify='space-between'
			align='center'
			gap='10'
			overflow='auto'
			px='4'
			alignSelf='center'>
			<VStack
				pos={'relative'}
				maxW={'100%'}
				spacing={2}
				direction='column'
				align={'center'}>
				<Heading textAlign='center' as='h6' fontSize={'xl'} fontWeight={500}>
					{poolData?.name}
				</Heading>

				<Image
					rounded={'full'}
					h={24}
					w={24}
					objectFit={'cover'}
					filter={'drop-shadow(0px 0px 10px #0000001d)'}
					src={poolData.imageURL}
				/>

				<Text textAlign='center' color={'gray.500'} fontSize='sm'>
					{poolData?.managerName}
				</Text>
			</VStack>

			{/* Supported Assets */}
			<Box>
				<Text as='div' mb='2' textAlign='center'>
					Assets Supported
				</Text>
				<HStack
					spacing={4}
					maxWidth={{ base: '40ch' }}
					m='auto'
					wrap='wrap'
					justify='center'>
					{poolData.assets.map((asset) => (
						<AssetTag key={asset.name} name={asset.name} icon={asset.icon} />
					))}
				</HStack>
			</Box>

			<Flex
				gap={8}
				width={'100%'}
				maxW='50ch'
				justify='space-between'
				flexDirection='column'
				align={'center'}>
				<Table variant='unstyled' size='sm'>
					<Tbody>
						<Tr>
							<Td textAlign='center' fontSize='lg' fontWeight='bold'>
								<Tooltip
									label='Total Value Managed'
									hasArrow
									aria-label='A tooltip'>
									TVM - $124.75k
								</Tooltip>
							</Td>
							<Td textAlign='center' fontSize='lg' fontWeight='bold'>
								Risk Factor - 4/5
							</Td>
						</Tr>
					</Tbody>
				</Table>
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
			</Flex>

			<Flex width={'100%'} justifyContent='space-evenly'>
				<ExternalLink
					color={useColorModeValue('blue.700', 'blue.500')}
					href={`https://app.dhedge.org/pool/${poolData.address}`}>
					Visit dHEDGE Pool <Icon as={FiExternalLink} />
				</ExternalLink>
			</Flex>
		</Flex>
	);
};
export default PoolDetails;
