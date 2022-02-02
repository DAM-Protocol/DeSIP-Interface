import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Flex, useColorModeValue, HStack } from '@chakra-ui/react';
import Notifications from './Notifications';
import UserMenu from './UserMenu';
import { ExternalNavLink, NavLink } from './Links';

const Navbar = (props) => {
	const bgColor = useColorModeValue('whiteAlpha.800', 'blackAlpha.700');

	return (
		<Flex
			as='nav'
			align='center'
			justify='space-between'
			w='100%'
			p={2}
			px={4}
			bg={bgColor}
			sx={{
				backdropFilter: 'blur( 20px )',
			}}
			pos={'sticky'}
			top={0}
			zIndex={999}>
			<NavLink to='/'>dSIP</NavLink>
			<HStack>
				<NavLink to='/'>Home</NavLink>
				<NavLink to='/super-suite'>Super Suite</NavLink>
				<ExternalNavLink href='/#'>Docs</ExternalNavLink>
			</HStack>
			<HStack>
				<Notifications />
				<ColorModeSwitcher justifySelf='flex-end' />
				<UserMenu />
			</HStack>
		</Flex>
	);
};

export default Navbar;
