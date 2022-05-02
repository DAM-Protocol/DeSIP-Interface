import {
	Flex,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
	ModalBody,
	ModalHeader,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { Web3Context } from '../../../context/Web3Context';
import TokenItem from './TokenItem';

const TokenSelector = ({
	isOpen,
	onClose,
	handleSelect,
	depositSuperTokens,
	finalFocusRef,
}) => {
	const { assetLookup } = useContext(Web3Context);
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			isCentered
			motionPreset='slideInBottom'
			scrollBehavior='inside'
			finalFocusRef={finalFocusRef}
		>
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
						gap='4'
					>
						{depositSuperTokens?.map((token) => (
							<TokenItem
								key={token.address}
								icon={assetLookup?.[token.address]?.imageURL}
								name={assetLookup?.[token.address]?.name}
								symbol={assetLookup?.[token.address]?.name}
								superTokenAddress={token.superTokenAddress}
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
