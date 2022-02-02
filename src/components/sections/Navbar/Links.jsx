import { Link, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

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
const ExternalNavLink = ({ children, href }) => (
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

export { NavLink, ExternalNavLink };
