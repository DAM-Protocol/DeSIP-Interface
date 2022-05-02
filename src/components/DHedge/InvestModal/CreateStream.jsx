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
	InputGroup,
	InputLeftElement,
	Image,
} from '@chakra-ui/react';
import { useState, useRef, useMemo } from 'react';
import TokenSelector from './TokenSelector';

const CreateStream = ({ poolData }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedToken, setSelectedToken] = useState();
	const handleSelect = (token) => {
		setSelectedToken(token);
		onClose();
	};

	const depositSuperTokens = useMemo(() => {
		// array of erc20 token addresses
		const supportedDepositTokens = poolData?.supportedDepositTokens;

		// object with erc20 address key and supertoken address value
		const supportedSuperTokens = poolData?.supportedSuperTokens;

		if (supportedDepositTokens && supportedSuperTokens) {
			// return common supertokens
			return supportedDepositTokens.reduce((acc, curr) => {
				if (supportedSuperTokens[curr]) {
					acc.push({
						address: curr,
						superTokenAddress: supportedSuperTokens[curr],
					});
				}
				return acc;
			}, []);
		}
	}, [poolData]);

	const rateInputRef = useRef();
	return (
		<VStack gap='6' w='100%' px='4' borderRadius={'md'}>
			<Alert
				status='warning'
				borderRadius='md'
				bg={useColorModeValue('yellow.50', 'yellow.900')}
			>
				<AlertIcon />
				Do your own research about the pools before streaming.
			</Alert>

			<TokenSelector
				isOpen={isOpen}
				onClose={onClose}
				handleSelect={handleSelect}
				depositSuperTokens={depositSuperTokens}
				finalFocusRef={rateInputRef}
			/>

			<FormControl>
				<label htmlFor='supertoken'>Super Token</label>
				<InputGroup>
					<InputLeftElement pointerEvents='none' mr='6'>
						<Image
							boxSize={'1.25rem'}
							borderRadius='50%'
							alt='token'
							src={selectedToken?.icon}
							fallbackSrc='https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-circle-outline-512.png'
						/>
					</InputLeftElement>

					<Input
						type='text'
						id='supertoken'
						onClick={onOpen}
						onKeyUp={(e) => {
							if (e.key === 'Enter') e.target.blur();
							if (e.key !== 'Tab' && e.key !== 'Shift' && e.key !== 'Escape')
								onOpen();
						}}
						cursor='pointer'
						onChange={() => {}}
						value={selectedToken?.symbol}
					/>
				</InputGroup>
			</FormControl>

			<FormControl>
				<label htmlFor='rate'> Rate (Tokens/month)</label>
				<Input type='number' id='rate' ref={rateInputRef} />
			</FormControl>

			<Spacer />

			<Button colorScheme={'blue'}>Start Stream</Button>
		</VStack>
	);
};

export default CreateStream;
