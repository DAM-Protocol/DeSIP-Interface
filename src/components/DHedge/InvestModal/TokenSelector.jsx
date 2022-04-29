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
	tokenList,
	finalFocusRef,
}) => {
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			isCentered
			motionPreset='slideInBottom'
			scrollBehavior='inside'
			finalFocusRef={finalFocusRef}>
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
export default TokenSelector;
