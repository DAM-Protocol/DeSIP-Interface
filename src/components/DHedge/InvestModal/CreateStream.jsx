import {
	Alert,
	AlertIcon,
	FormControl,
	Input,
	Spacer,
	VStack,
	useDisclosure,
	useColorModeValue,
	Button,
} from '@chakra-ui/react';
import { useState } from 'react';
import TokenSelector from './TokenSelector';

const CreateStream = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedToken, setSelectedToken] = useState(null);
	const handleSelect = (token) => {
		setSelectedToken(token);
		onClose();
	};
	return (
		<VStack gap='6' width='50%' px='4' borderRadius={'md'}>
			<Alert
				status='warning'
				borderRadius='md'
				bg={useColorModeValue('yellow.50', 'yellow.900')}>
				<AlertIcon />
				Do your own research about the pools before streaming.
			</Alert>

			<TokenSelector
				isOpen={isOpen}
				onClose={onClose}
				handleSelect={handleSelect}></TokenSelector>

			<FormControl>
				<label htmlFor='supertoken'>Super Token</label>
				<Input
					type='text'
					readOnly
					id='supertoken'
					onClick={onOpen}
					onInput={onOpen}
					cursor='pointer'
					value={selectedToken?.symbol}
				/>
			</FormControl>

			<FormControl>
				<label htmlFor='rate'> Rate (Tokens/month)</label>
				<Input type='number' id='rate' />
			</FormControl>

			<Spacer />

			<Button colorScheme={'blue'}>Start Stream</Button>
		</VStack>
	);
};

export default CreateStream;
