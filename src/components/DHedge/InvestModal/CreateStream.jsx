import {
	Alert,
	AlertIcon,
	Spacer,
	VStack,
	useColorModeValue,
	Button,
	useInterval,
} from '@chakra-ui/react';
import { useState, useRef, useEffect, useContext, useMemo } from 'react';
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis';
import { dhedgeCoreAbi } from '../../../abi/dhedgeCore';
import { Web3Context } from '../../../context/Web3Context';
import BufferDisplay from './BufferDisplay';
import RateInput from './RateInput';
import SuperTokenSelector from './SuperTokenSelector';

const CreateStream = ({ poolData }) => {
	const { account, isWeb3Enabled } = useMoralis();
	const { sfProvider, sf, initialiseSf } = useContext(Web3Context);

	useEffect(() => {
		if (!sfProvider && isWeb3Enabled) {
			initialiseSf();
			console.log('initialiseSf');
		}
	}, [isWeb3Enabled, initialiseSf, sfProvider]);

	const [selectedToken, setSelectedToken] = useState();
	const [streamRate, setStreamRate] = useState(0);
	const [existingStreamRate, setExistingStreamRate] = useState(0);

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
				.then(({ flowRate }) => {
					setExistingStreamRate(flowRate);
					setStreamRate(flowRate);
				});
	}, [account, poolData, selectedToken, sfProvider]);

	const rateInputRef = useRef();

	// const bufferCalcParams = useMemo(
	// 	() => ({
	// 		_user: account,
	// 		_superToken: selectedToken?.superTokenAddress,
	// 		_streamAction: 'create',
	// 		_delay: 60 * 10,
	// 		_flowRate: streamRate,
	// 	}),
	// 	[account, selectedToken?.superTokenAddress, streamRate]
	// );

	const {
		data: bufferAmount,
		fetch: calcBufferTransferAmount,
		isLoading,
	} = useWeb3ExecuteFunction(
		{
			functionName: 'calcBufferTransferAmount',
			abi: dhedgeCoreAbi,
			contractAddress: poolData?.superPoolAddress,
			params: {
				_user: account,
				_superToken: selectedToken?.superTokenAddress,
				_streamAction: 'create',
				_delay: 60 * 10, //in seconds
				_flowRate: streamRate,
			},
		},
		{
			autoFetch: true,
		},
		[poolData, account, selectedToken, streamRate]
	);
	useInterval(() => {
		console.log('calcBufferTransferAmount');
		calcBufferTransferAmount({ onComplete: () => console.log('completed') });
	}, 60 * 1000);

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

			<SuperTokenSelector
				poolData={poolData}
				rateInputRef={rateInputRef}
				selectedToken={selectedToken}
				setSelectedToken={setSelectedToken}
			/>
			<RateInput
				selectedToken={selectedToken}
				streamRate={streamRate}
				setStreamRate={setStreamRate}
				rateInputRef={rateInputRef}
			/>

			<BufferDisplay
				selectedToken={selectedToken}
				bufferAmount={bufferAmount}
			/>

			<Spacer />

			<Button colorScheme={'blue'} disabled={existingStreamRate === streamRate}>
				Start Stream
			</Button>
		</VStack>
	);
};

export default CreateStream;
