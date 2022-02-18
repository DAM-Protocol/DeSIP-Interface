import {
	Text,
	Heading,
	Divider,
	StatGroup,
	Stat,
	StatLabel,
	StatNumber,
	StatHelpText,
	StatArrow,
	Box,
} from '@chakra-ui/react';
import Pools from '../../components/DHedge/Pools';
import Page from '../../components/layouts/Page';

const SuperDHedge = () => {
	return (
		<Page>
			<Box>
				<Heading as='h1' size='2xl' mb='8'>
					Super dHEDGE
				</Heading>
				<Text display='block'>
					Stream into dHEDGE Pools in two clicks
					<br />
					<br />
					Let top Managers do the work for you. Check their track records and
					trading strategies.
				</Text>
				<StatGroup>
					<Stat>
						<StatLabel>Now Streaming</StatLabel>
						<StatNumber>$ 345,670</StatNumber>
						<StatHelpText>
							<StatArrow type='increase' />
							23.36%
						</StatHelpText>
					</Stat>

					<Stat>
						<StatLabel>Pools</StatLabel>
						<StatNumber>4</StatNumber>
					</Stat>
				</StatGroup>
			</Box>

			<Divider></Divider>

			<Box>
				<Heading as='h2' size='lg' textAlign='center'>
					Pools
				</Heading>

				<Pools></Pools>
			</Box>
		</Page>
	);
};

export default SuperDHedge;
