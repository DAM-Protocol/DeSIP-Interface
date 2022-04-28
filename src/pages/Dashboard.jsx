import {
	Box,
	Heading,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from '@chakra-ui/react';
import DHedgeDashboard from '../components/DHedge/Dashboard/';
import Page from '../components/layouts/Page';

const Dashboard = () => {
	return (
		<Page px={{ base: '0.25rem', md: '1.5rem' }} bg>
			<Box>
				<Heading as='h2' size='xl' mb='8' textAlign='center'>
					Dashboard
				</Heading>
				<Tabs colorScheme='blue'>
					<TabList>
						<Tab>Super-dHEDGE</Tab>
						<Tab isDisabled>Super-Enzyme</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<DHedgeDashboard />
						</TabPanel>
						<TabPanel>Super-Enzyme</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>
		</Page>
	);
};

export default Dashboard;
