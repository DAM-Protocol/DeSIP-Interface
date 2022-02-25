import { useMoralis } from 'react-moralis';
import makeBlockie from 'ethereum-blockies-base64';
import {
	Avatar,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	Center,
	useColorMode,
	useColorModeValue,
	Text,
	Icon,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';

const UserMenu = () => {
	const { user, authenticate, logout } = useMoralis();
	const { toggleColorMode } = useColorMode();
	const text = useColorModeValue('dark', 'light');
	const SwitchIcon = useColorModeValue(FaMoon, FaSun);

	return user ? (
		<Menu>
			<MenuButton
				as={Button}
				rounded={'full'}
				variant={'link'}
				cursor={'pointer'}
				minW={0}>
				<Avatar
					size={'sm'}
					src={makeBlockie(user?.get('ethAddress')) || '0x'}
				/>
			</MenuButton>
			<MenuList alignItems={'center'} boxShadow={'lg'}>
				<Center>
					<Avatar
						size={'xl'}
						src={makeBlockie(user?.get('ethAddress') || '0x')}
					/>
				</Center>
				<Center>
					<Text maxW='10ch' isTruncated>
						{user?.get('ethAddress')}
					</Text>
				</Center>

				<MenuDivider />

				<MenuItem
					aria-label={`Switch to ${text} mode`}
					onClick={toggleColorMode}>
					Switch Mode <Icon ml='4' as={SwitchIcon} fontSize='sm' />
				</MenuItem>

				<MenuItem as={RouterLink} to='/settings'>
					{/* <RouterLink to='/settings'>Settings</RouterLink> */}
					Settings
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
			Connect
		</Button>
	);
};
export default UserMenu;
