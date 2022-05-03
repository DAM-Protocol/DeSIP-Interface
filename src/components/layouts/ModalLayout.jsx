import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	useColorModeValue,
} from '@chakra-ui/react';

const ModalLayout = ({ size, isOpen, onClose, children, header }) => {
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			scrollBehavior={'inside'}
			size={size ? size : '3xl'}
			isCentered
			blockScrollOnMount
		>
			<ModalOverlay />
			<ModalContent
				maxH='2xl'
				background={useColorModeValue('white', 'bg.dark.900')}
				borderWidth='1px'
				borderColor={useColorModeValue('gray.200', 'blue.700')}
			>
				<ModalHeader textAlign={'center'} fontSize='2xl'>
					{header}
				</ModalHeader>

				<ModalCloseButton />

				<ModalBody py='4' pb='8' px={{ md: '6', sm: '0' }}>
					{children}
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default ModalLayout;
