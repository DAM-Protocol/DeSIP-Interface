import { Box, Stack, useColorModeValue } from '@chakra-ui/react';

const Page = (props) => {
	const bg = useColorModeValue('bg.gray.100', 'bg.dark.950');

	return (
		<Box
			minH='calc(100vh - 11rem)'
			backgroundColor={props.bg && bg}
			transition={'background-color 0.2s ease-in-out'}
			w='100%'
			className='Page'
		>
			<Stack
				m='auto'
				maxW={{ xl: '1300px' }}
				direction={'column'}
				w='100%'
				overflowX={'hidden'}
				justify={['center', 'flex-start']}
				py='3rem'
				px='1.5rem'
				{...props}
			>
				{props.children}
			</Stack>
		</Box>
	);
};

export default Page;
