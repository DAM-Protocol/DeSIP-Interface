import {
	Text,
	Heading,
	Center,
	Box,
	Image,
	useColorModeValue,
	Stack,
	Button,
} from '@chakra-ui/react';

const ProductCard = ({ title, description, imageURL, chain, disabled }) => {
	return (
		<Center py={6} minW={'340px'}>
			<Box
				border={'1px solid'}
				borderColor={useColorModeValue('gray.100', 'blue.800')}
				role={'group'}
				p={6}
				maxW={'330px'}
				w={'full'}
				bg={useColorModeValue('white', 'blackAlpha.500')}
				boxShadow={'2xl'}
				rounded={'xl'}
				pos={'relative'}
				zIndex={1}>
				<ProductImage imageURL={imageURL} />
				<Stack pt={10} align={'center'}>
					<Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
						{chain}
					</Text>
					<Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
						{title}
					</Heading>
					<Stack direction={'row'} align={'center'}>
						<Text color={'gray.500'}>{description}</Text>
					</Stack>

					<Button
						flex={1}
						fontSize={'sm'}
						rounded={'full'}
						px={10}
						py={3}
						bg={'blue.400'}
						color={'white'}
						_hover={{
							bg: 'blue.500',
						}}
						disabled={disabled}>
						{disabled ? 'Coming Soon' : 'Invest'}
					</Button>
				</Stack>
			</Box>
		</Center>
	);
};
const ProductImage = ({ imageURL }) => {
	return (
		<Box
			rounded={'xl'}
			mt={-12}
			pos={'relative'}
			height={'230px'}
			_after={{
				transition: 'all .3s ease',
				content: '""',
				w: '80%',
				h: '80%',
				pos: 'absolute',
				bottom: -2,
				left: '50%',
				transform: 'translateX(-50%)',
				backgroundImage: `url(${imageURL})`,
				filter: 'blur(20px)',
				zIndex: -1,
			}}
			_groupHover={{
				_after: {
					filter: 'blur(30px)',
				},
			}}>
			<Image
				rounded={'xl'}
				height={230}
				width={282}
				objectFit={'cover'}
				src={imageURL}
				border={useColorModeValue('', '1px solid')}
				borderColor={'blue.800'}
			/>
		</Box>
	);
};

export default ProductCard;
