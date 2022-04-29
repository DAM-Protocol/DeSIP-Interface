import { Text, Heading, Divider, Stack } from '@chakra-ui/react';
import Page from '../../components/layouts/Page';
import ProductCard from '../../components/ProductCard';

const Suite = () => {
	return (
		<Page>
			<Heading as='h1' size='2xl' textAlign='center'>
				Super Suite
			</Heading>
			<Divider />
			<Stack
				mt='6'
				pt={10}
				direction={['column', 'column', 'row']}
				justify='space-evenly'>
				{PRODUCTS.map((product) => {
					return (
						<ProductCard
							key={product.title}
							title={product.title}
							description={product.description}
							imageURL={product.imageURL}
							chain={product.chain}
							disabled={product.disabled}
						/>
					);
				})}
			</Stack>
		</Page>
	);
};

const PRODUCTS = [
	{
		title: 'super-dHEDGE',
		description: (
			<>
				Stream into dHedge Pools in two clicks
				<br />
				<br />
				Let top Managers do the work for you. Check their track records and
				trading strategies.
			</>
		),
		imageURL:
			'https://www.newsbtc.com/wp-content/uploads/2020/09/dhedge-img.png',
		chain: 'Polygon',
		disabled: false,
	},
	{
		title: 'super-Enzyme',
		description: (
			<>
				Stream into Enzyme
				<br />
				<br />
				Find a vault with a proven track record on Enzyme, and free yourself
				from the day-to-day hassles whilst retaining full custody of your
				assets.
			</>
		),
		imageURL:
			'https://www.cryptoninjas.net/wp-content/uploads/enzyme-cryptoninjas.jpg',
		chain: 'Polygon',
		disabled: true,
	},
];

export default Suite;
