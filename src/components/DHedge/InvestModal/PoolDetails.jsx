import { ExternalLink } from '../../Links';
import { FiExternalLink } from 'react-icons/fi';
import {
	Flex,
	Heading,
	Box,
	useColorModeValue,
	Text,
	HStack,
	Table,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
	Tooltip,
	Icon,
	Tag,
	Image,
	TagLabel,
	Avatar,
	VStack,
} from '@chakra-ui/react';

const PoolDetails = ({ poolData }) => {
	return (
		<Flex
			role={'group'}
			w={{ base: '100%', lg: '50%' }}
			direction='column'
			justify='space-between'
			gap='10'
			overflow='auto'
			px='4'>
			<VStack
				pos={'relative'}
				w={'100%'}
				spacing={2}
				direction='column'
				align={'center'}>
				<Image
					rounded={'full'}
					h={24}
					w={24}
					objectFit={'cover'}
					filter={'drop-shadow(0px 0px 10px #0000001d)'}
					src={poolData.imageURL}
				/>

				<Heading textAlign='center' as='h6' fontSize={'lg'} fontWeight={500}>
					{poolData?.name}
				</Heading>

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
					{assets.map((asset) => (
						<Asset key={asset.name} name={asset.name} icon={asset.icon} />
					))}
				</HStack>
			</Box>

			<Flex
				gap={8}
				width={'100%'}
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

const Asset = ({ name, icon }) => (
	<Tag size='lg' variant='subtle' colorScheme='blue' borderRadius='full' my='2'>
		<Avatar src={icon} size='xs' name={name} ml={-1} mr={2} />
		<TagLabel>{name}</TagLabel>
	</Tag>
);

const assets = [
	{
		name: 'BTC',
		icon: 'https://dhedge.org/assets/images/icons/btc.svg',
	},
	{
		name: 'USDC',
		icon: 'https://app.dhedge.org/static/media/usdc.c8fcab48.svg',
	},
];

export default PoolDetails;
