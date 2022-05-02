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
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	HStack,
	ButtonGroup,
	Image,
	Box,
	Stack,
	Flex,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import { connectors } from './connectorConfig';

const UserMenu = () => {
	const { isOpen: isWalletSelectorOpen, onToggle: toggleWalletSelector } =
		useDisclosure();
	const { user, logout } = useMoralis();
	const { toggleColorMode } = useColorMode();
	const text = useColorModeValue('dark', 'light');
	const SwitchIcon = useColorModeValue(FaMoon, FaSun);

	return (
		<>
			<WalletSelectorModal
				isWalletSelectorOpen={isWalletSelectorOpen}
				toggleWalletSelector={toggleWalletSelector}
			/>

			{user ? (
				<Menu>
					<MenuButton
						as={Button}
						rounded={'full'}
						variant={'link'}
						cursor={'pointer'}
						minW={0}
					>
						<Avatar
							size={'sm'}
							src={makeBlockie(user?.get('ethAddress') || '0x')}
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
							onClick={toggleColorMode}
						>
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
					onClick={() => toggleWalletSelector()}
				>
					Connect
				</Button>
			)}
		</>
	);
};

const WalletSelectorModal = ({
	isWalletSelectorOpen,
	toggleWalletSelector,
}) => {
	const { authenticate } = useMoralis();
	const login = async (connectorId) => {
		try {
			await authenticate({ provider: connectorId });
			window.localStorage.setItem('connectorId', connectorId);
			toggleWalletSelector();
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<Modal
			isOpen={isWalletSelectorOpen}
			onClose={toggleWalletSelector}
			size='md'
			isCentered
			blockScrollOnMount
		>
			<ModalOverlay />
			<ModalContent
				background={useColorModeValue('white', 'bg.dark.900')}
				borderWidth='1px'
				borderColor={useColorModeValue('gray.200', 'blue.700')}
				borderRadius='xl'
			>
				<ModalHeader textAlign={'center'} fontSize='2xl'>
					Connect Wallet
				</ModalHeader>

				<ModalBody py='4' pb='8' px={{ md: '6', sm: '0' }}>
					<Flex wrap='wrap' justify='space-between' gap='4'>
						{connectors.map(({ title, icon, connectorId }, key) => (
							<Button
								w='17ch'
								h='20'
								p='4'
								variant='outline'
								leftIcon={<Image src={icon} alt={title} boxSize='30' />}
								key={key}
								onClick={() => login(connectorId)}
							>
								<Text as='span' fontWeight={400} fontSize='md'>
									{title}
								</Text>
							</Button>
						))}
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
export default UserMenu;
