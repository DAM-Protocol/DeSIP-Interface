import { ExternalLink } from '../../Links';
import { FiExternalLink } from 'react-icons/fi';
import {
	Flex,
	Heading,
	Center,
	Box,
	useColorModeValue,
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
			w={'50%'}
			direction='column'
			justify='space-between'
			gap='10'
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
				<HStack spacing={4} width={{ base: '40ch' }} m='auto'>
					<Tag
						size='lg'
						variant='subtle'
						colorScheme='blue'
						borderRadius='full'>
						<Avatar
							src='https://app.dhedge.org/static/media/usdc.c8fcab48.svg'
							size='xs'
							name='USDC'
							ml={-1}
							mr={2}
						/>
						<TagLabel>USDC</TagLabel>
					</Tag>
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
					color='blue.700'
					href={`https://app.dhedge.org/pool/${poolData.address}`}>
					Visit dHEDGE Pool <Icon as={FiExternalLink} />
				</ExternalLink>
			</Flex>
		</Flex>
	);
};

export default PoolDetails;
