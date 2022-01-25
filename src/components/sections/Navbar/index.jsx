import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Flex, Link, useColorModeValue, HStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import Notifications from './Notifications';
import UserMenu from './UserMenu';

const Navbar = (props) => {
	const bgColor = useColorModeValue('white.50', 'gray.900');

	return (
		<Flex
			as='nav'
			align='center'
			justify='space-between'
			w='100%'
			p={2}
			px={4}
			shadow='sm'
			bgColor={bgColor}
			pos={'sticky'}
			top={0}>
			<NavLink to='/'>dSIP</NavLink>
			<HStack>
				<NavLink to='/'>Home</NavLink>
				<NavLink to='/settings'>Super Suite</NavLink>
				<ExternalLink href='/#'>Docs</ExternalLink>
			</HStack>
			<HStack>
				<Notifications />
				<ColorModeSwitcher justifySelf='flex-end' />
				<UserMenu />
			</HStack>
		</Flex>
	);
};

const NavLink = ({ children, to }) => (
	<Link
		as={RouterLink}
		p={2.5}
		to={to}
		rounded={'md'}
		_hover={{
			textDecoration: 'none',
			bg: useColorModeValue('blackAlpha.50', 'whiteAlpha.200'),
		}}>
		{children}
	</Link>
);
const ExternalLink = ({ children, href }) => (
	<Link
		p={2.5}
		href={href}
		rounded={'md'}
		isExternal
		_hover={{
			textDecoration: 'none',
			bg: useColorModeValue('blackAlpha.50', 'whiteAlpha.200'),
		}}>
		{children}
	</Link>
);

export default Navbar;
