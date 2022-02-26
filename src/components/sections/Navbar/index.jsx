import {
	Flex,
	useColorModeValue,
	HStack,
	useDisclosure,
	IconButton,
	VStack,
	Text,
	Button,
	Popover,
	PopoverTrigger,
	PopoverContent,
	Stack,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import UserMenu from './UserMenu';
import { ExternalLink, NavLink } from './Links';
import { VscClose } from 'react-icons/vsc';
import { RiMenu5Fill } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';
import { useChain, useMoralis } from 'react-moralis';
import { useEffect } from 'react';

const Navbar = (props) => {
	const bgColor = useColorModeValue('whiteAlpha.800', 'blackAlpha.700');
	const { isOpen, onToggle } = useDisclosure();
	const { switchNetwork, chain } = useChain();
	const { isAuthenticated, enableWeb3, isWeb3Enabled, isWeb3EnableLoading } =
		useMoralis();

	useEffect(() => {
		if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated, isWeb3Enabled]);

	return (
		<>
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
				wrap='wrap'
				zIndex={999}>
				<NavLink to='/'>
					<Text fontSize='lg' fontWeight='bold'>
						DeSIP
					</Text>
				</NavLink>

				<HStack display={{ base: 'none', sm: 'flex' }}>
					<NavLink to='/'>Home</NavLink>

					<Popover trigger={'hover'} placement={'bottom-start'}>
						<PopoverTrigger>
							<NavLink to='/Super-Suite'>Super-Suite</NavLink>
						</PopoverTrigger>

						<PopoverContent
							border={0}
							boxShadow={'md'}
							p={4}
							rounded={'md'}
							bg={useColorModeValue('white', 'black')}>
							<VStack>
								<NavLink w='full' to='/Super-dHEDGE'>
									Super-dHEDGE
								</NavLink>
							</VStack>
						</PopoverContent>
					</Popover>

					<NavLink to='/Dashboard'>Dashboard</NavLink>
					<ExternalLink href='https://d-a-m-p.gitbook.io/dsip/'>
						Docs
					</ExternalLink>
				</HStack>
				<HStack>
					{chain && (
						<Button
							size='md'
							variant={chain?.chainId === '0x89' ? 'ghost' : 'outline'}
							colorScheme={chain?.chainId === '0x89' ? 'green' : 'red'}
							onClick={() => switchNetwork('0x89')}>
							{chain?.chainId === '0x89' ? 'Polygon' : 'Wrong Network'}
						</Button>
					)}

					<UserMenu />
					<IconButton
						onClick={onToggle}
						icon={isOpen ? null : <RiMenu5Fill />}
						variant={'ghost'}
						aria-label={'Toggle Navigation'}
						display={{ base: 'flex', sm: 'none' }}
					/>
				</HStack>
			</Flex>
			<AnimatePresence>
				{isOpen && <MobileNav onToggle={onToggle} />}
			</AnimatePresence>
		</>
	);
};
const MotionVStack = motion(VStack);

const MobileNav = ({ onToggle }) => {
	return (
		<>
			<MotionVStack
				display={{ base: 'flex', sm: 'none' }}
				bg={useColorModeValue('blue.50', 'gray.900')}
				p={4}
				justify='center'
				sx={{
					width: '100vw',
					position: 'fixed',
					left: 0,
					top: 0,
					height: '100vh',
					zIndex: 999,
				}}
				duration={0.1}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}>
				<NavLink
					to='/'
					display='block'
					textAlign='center'
					width='100%'
					onClick={onToggle}>
					Home
				</NavLink>
				<NavLink
					to='/Super-Suite'
					display='block'
					width='100%'
					textAlign='center'
					onClick={onToggle}>
					Super-Suite
				</NavLink>
				<NavLink
					to='/Dashboard'
					display='block'
					width='100%'
					textAlign='center'
					onClick={onToggle}>
					Dashboard
				</NavLink>
				<ExternalLink
					href='https://d-a-m-p.gitbook.io/dsip/'
					display='block'
					width='100%'
					textAlign='center'
					onClick={onToggle}>
					Docs
				</ExternalLink>
			</MotionVStack>
			<IconButton
				onClick={onToggle}
				icon={<VscClose />}
				variant={'ghost'}
				aria-label={'Toggle Navigation'}
				display={{ base: 'flex', md: 'none' }}
				position='fixed'
				right={4}
				top={3}
				zIndex='1001'
			/>
		</>
	);
};

export default Navbar;
