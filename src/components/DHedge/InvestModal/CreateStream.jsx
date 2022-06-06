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
import { SuperToken } from '@superfluid-finance/sdk-core';
import { useState, useRef, useMemo, useEffect, useContext } from 'react';
import { useMoralis } from 'react-moralis';
import { Web3Context } from '../../../context/Web3Context';
import TokenSelector from './TokenSelector';

const CreateStream = ({ poolData }) => {
	const { account, isWeb3Enabled } = useMoralis();
	const { sfProvider, sf, initialiseSf, assetLookup } = useContext(Web3Context);

	useEffect(() => {
		if (!sfProvider && isWeb3Enabled) {
			initialiseSf();
			console.log('initialiseSf');
		}
	}, [isWeb3Enabled, initialiseSf, sfProvider]);

	const { isOpen, onOpen, onClose } = useDisclosure();

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
		} else return [];
	}, [poolData]);

	const [selectedToken, setSelectedToken] = useState();
	const [streamRate, setStreamRate] = useState(0);

	useEffect(() => {
		if (!selectedToken && depositSuperTokens?.[0] && assetLookup) {
			const defaultToken = depositSuperTokens[0];
			setSelectedToken({
				...defaultToken,
				name: assetLookup?.[defaultToken.address]?.name,
				symbol: assetLookup?.[defaultToken.address]?.name,
				icon: assetLookup?.[defaultToken.address]?.imageURL,
			});
		}
	}, [depositSuperTokens, selectedToken, assetLookup]);
	useEffect(() => {
		if (sf && selectedToken && !selectedToken?.superToken) {
			const { superTokenAddress } = selectedToken;

			sf.loadSuperToken(superTokenAddress).then(async (superToken) => {
				setSelectedToken({ ...selectedToken, superToken });
			});
		}
	}, [poolData, selectedToken, sf, sfProvider, account]);
	useEffect(() => {
		if (poolData && selectedToken?.superToken)
			selectedToken?.superToken
				.getFlow({
					sender: poolData.superPoolAddress,
					receiver: account,
					providerOrSigner: sfProvider,
				})
				.then(({ flowRate }) => setStreamRate(flowRate));
	}, [account, poolData, selectedToken, sfProvider]);

	const handleSelect = (token) => {
		setSelectedToken(token);
		onClose();
	};

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
						autoComplete='off'
						onClick={onOpen}
						onKeyUp={(e) => {
							if (e.key === 'Enter') e.target.blur();
							if (e.key !== 'Tab' && e.key !== 'Shift' && e.key !== 'Escape')
								onOpen();
						}}
						cursor='pointer'
						onChange={() => {}}
						value={selectedToken ? selectedToken?.symbol + 'x' : ''}
					/>
				</InputGroup>
			</FormControl>

			<FormControl aria-autocomplete='none'>
				<label htmlFor='rate'>
					Rate ({(selectedToken?.symbol || '') + 'x' || 'Tokens'}/month)
				</label>
				<Input
					min={0}
					value={streamRate}
					onChange={setStreamRate}
					autoComplete='new-password'
					type='number'
					id='rate'
					ref={rateInputRef}
				/>
			</FormControl>

			<Spacer />

			<Button colorScheme={'blue'}>Start Stream</Button>
		</VStack>
	);
};

export default CreateStream;
