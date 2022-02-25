import { forwardRef, Link, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const NavLink = forwardRef(({ children, to, ...rest }, ref) => (
	<Link
		ref={ref}
		as={RouterLink}
		p={2.5}
		to={to}
		rounded={'md'}
		_hover={{
			textDecoration: 'none',
			bg: useColorModeValue('blackAlpha.50', 'whiteAlpha.200'),
		}}
		{...rest}>
		{children}
	</Link>
));
const ExternalLink = forwardRef(({ children, href, ...rest }, ref) => (
	<Link
		p={2.5}
		href={href}
		rounded={'md'}
		isExternal
		_hover={{
			textDecoration: 'none',
			bg: useColorModeValue('blackAlpha.50', 'whiteAlpha.200'),
		}}
		{...rest}>
		{children}
	</Link>
));

export { NavLink, ExternalLink };
