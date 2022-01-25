import { Text, Heading } from '@chakra-ui/react';
import Page from '../components/layouts/Page';

const Landing = () => {
	return (
		<Page>
			<Heading as='h3' size='lg'>
				dSIP
			</Heading>
			<Text>Systematic Investments for Your Crypto Assets</Text>
		</Page>
	);
};

export default Landing;
