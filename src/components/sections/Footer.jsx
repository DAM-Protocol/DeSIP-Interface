import {
	Flex,
	HStack,
	Spacer,
	useColorModeValue,
	Icon,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { ExternalLink, InternalLink } from '../Links';
import { FaGithub } from 'react-icons/fa';

const Footer = (props) => {
	const bgColor = useColorModeValue('whiteAlpha.300', 'blackAlpha.400');
	const borderColor = useColorModeValue('gray.200', 'gray.700');

	return (
		<Flex
			as='footer'
			align='center'
			// justify='space-between'
			w='100%'
			p={10}
			px={4}
			borderTop='1px'
			borderColor={borderColor}
			bgColor={bgColor}
			pos={'sticky'}
			top={0}>
			<HStack spacing='6' wrap='wrap'>
				<InternalLink fontWeight='medium' to='/'>
					Home
				</InternalLink>
				<InternalLink fontWeight='medium' to='/Super-Suite'>
					Super Suite
				</InternalLink>
				<InternalLink fontWeight='medium' to='/Super-dHEDGE'>
					Super-dHEDGE
				</InternalLink>

				<ExternalLink
					fontWeight='medium'
					href='https://d-a-m-p.gitbook.io/dsip/'>
					Docs
				</ExternalLink>
			</HStack>

			<Spacer></Spacer>
			<ExternalLink
				href='https://github.com/DAM-Protocol'
				display='flex'
				align='center'>
				<Icon as={FaGithub} fontSize='xl' />
			</ExternalLink>
			<ColorModeSwitcher size='xl' fontSize='xl' ml='4' />
		</Flex>
	);
};

export default Footer;
