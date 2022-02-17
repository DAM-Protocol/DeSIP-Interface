import {
	Flex,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
	ModalBody,
	ModalHeader,
} from '@chakra-ui/react';
import TokenItem from './TokenItem';

const TokenSelector = ({
	isOpen,
	onClose,
	handleSelect,
	tokenList = defaultTokenList,
}) => {
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			isCentered
			motionPreset='slideInBottom'
			scrollBehavior='inside'>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Select A Super Token</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Flex
						flexDirection='column'
						align='center'
						my={5}
						maxHeight='80%'
						minHeight='20rem'
						gap='4'>
						{tokenList.map((token, index) => (
							<TokenItem
								key={index}
								icon={token.icon}
								name={token.name}
								symbol={token.symbol}
								address={token.address}
								handleSelect={handleSelect}
							/>
						))}
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

const defaultTokenList = [
	{
		address: '0x2058a9d7613eee744279e3856ef0eada5fcbaa7e',
		icon: 'https://s2.coinmarketcap.com/static/img/coins/200x200/3408.png',
		superToken: '0x86beec8a6e0e0ded142998ed8ddcbce118f91864',
		decimals: 6,
		symbol: 'USDCx',
		name: 'USDC',
	},
];

export default TokenSelector;
