import {
	useColorModeValue,
	VStack,
	Image,
	Stack,
	Box,
	Divider,
	StatGroup,
	Stat,
	StatNumber,
	StatHelpText,
	Flex,
	HStack,
} from '@chakra-ui/react';
import { InternalLink } from '../../Links';
import DhptStats from '../DhptStats';
import StreamTable from './StreamTable';
import { NavLink, ExternalLink } from '../../sections/Navbar/Links';
import getRelativeTime from '../../../utils/getRelativeTime';

const PoolTableItem = ({ poolData }) => {
	const border = {
		borderWidth: '1px',
		borderRadius: '10',
		borderStyle: 'solid',
		borderColor: useColorModeValue('gray.200', 'blue.800'),
		borderBottom: '1px solid',
		borderBottomColor: useColorModeValue('gray.200', 'blue.800'),
	};

	return (
		<Box
			{...border}
			my='6'
			bg={useColorModeValue('whiteAlpha.500', 'blackAlpha.400')}
		>
			<ItemHeader poolData={poolData} />

			<Divider mb='4' mt='-4' />

			<Box borderRadius='10' overflow='scroll' pb='4'>
				<StreamTable poolData={poolData} />
			</Box>
		</Box>
	);
};

const ItemHeader = ({ poolData }) => {
	return (
		<Box _hover={{ background: 'none' }}>
			<Flex
				w='full'
				gap='4'
				p='4'
				justifyContent={{ base: 'space-between', lg: 'space-evenly' }}
				wrap='wrap'
				alignItems={{ base: 'end' }}
				m='auto'
			>
				{/* Pool Image, Name and Invest Button */}
				<Stack
					w={{ base: '100%', lg: 'auto' }}
					spacing='2'
					justify='center'
					align='center'
					direction={['column', 'row', 'row']}
					alignSelf={{ base: 'end', md: 'center' }}
				>
					<Image
						boxSize='16'
						rounded={'md'}
						objectFit={'cover'}
						filter={'drop-shadow(0px 0px 5px #0000001d)'}
						src={poolData?.imageURL}
					/>
					<VStack w='25ch'>
						<InternalLink to={`/Super-dHEDGE/${poolData?.superPoolAddress}`}>
							{poolData?.name}
						</InternalLink>

						<HStack>
							<NavLink
								fontSize='sm'
								to={`/Super-dHEDGE/${poolData?.superPoolAddress}`}
							>
								Super Pool
							</NavLink>
							<ExternalLink
								fontSize='sm'
								href={`https://app.dhedge.org/pool/${poolData?.dhedgeFundAddress}`}
							>
								dHEDGE Fund
							</ExternalLink>
						</HStack>
					</VStack>
				</Stack>

				{/* Pool Stats */}
				<Box>
					<DhptStats
						adjustedTokenPrice={poolData?.adjustedTokenPrice}
						poolSuperToken={poolData?.superToken}
						prevAdjustedTokenPrice={poolData?.prevAdjustedTokenPrice}
					/>
				</Box>

				<StatGroup px={{ base: '4', md: '10' }} py='6' zIndex='9' minW='20ch'>
					<Stat>
						<StatNumber fontSize='xl'>
							{getRelativeTime(poolData?.lastDeposit)}
						</StatNumber>
						<StatHelpText>Last Deposited</StatHelpText>
					</Stat>
				</StatGroup>
			</Flex>
		</Box>
	);
};

export default PoolTableItem;
