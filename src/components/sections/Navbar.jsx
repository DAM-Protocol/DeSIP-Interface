import { ColorModeSwitcher } from '../ColorModeSwitcher';
import {
	Flex,
	Link,
	useColorModeValue,
	Avatar,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	Center,
	HStack,
	Text,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import Notifications from '../Notifications';
import { useMoralis } from 'react-moralis';
import makeBlockie from 'ethereum-blockies-base64';

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
			</HStack>
			<HStack>
				<Notifications />
				<ColorModeSwitcher justifySelf='flex-end' />
				<UserMenu />
			</HStack>
		</Flex>
	);
};

const UserMenu = () => {
	const { user, authenticate, logout } = useMoralis();

	return user ? (
		<Menu>
			<MenuButton
				as={Button}
				rounded={'full'}
				variant={'link'}
				cursor={'pointer'}
				minW={0}>
				<Avatar size={'sm'} src={makeBlockie(user.get('ethAddress'))} />
			</MenuButton>
			<MenuList alignItems={'center'} boxShadow={'lg'}>
				<Center>
					<Avatar size={'xl'} src={makeBlockie(user.get('ethAddress'))} />
				</Center>
				<Center>
					<Text maxW='10ch' isTruncated>
						{user.get('ethAddress')}
					</Text>
				</Center>
				<MenuDivider />
				<MenuItem>
					<RouterLink to='/settings'>Settings</RouterLink>
				</MenuItem>
				<MenuItem onClick={() => logout()}>Log Out</MenuItem>
			</MenuList>
		</Menu>
	) : (
		<Button
			size='md'
			variant='outline'
			colorScheme='red'
			onClick={() => authenticate()}>
			Connect Wallet
		</Button>
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

export default Navbar;
