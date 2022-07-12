import {
	Alert,
	AlertIcon,
	Spacer,
	VStack,
	useColorModeValue,
	Button,
	useInterval,
	useToast,
} from '@chakra-ui/react';
import { useState, useRef, useEffect, useContext } from 'react';
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis';
import { dhedgeCoreAbi } from '../../../abi/dhedgeCore';
import { Web3Context } from '../../../context/Web3Context';
import BufferDisplay from './BufferDisplay';
import RateInput from './RateInput';
import SuperTokenSelector from './SuperTokenSelector';

const CreateStream = ({ poolData }) => {
	const { isWeb3Enabled, account, Moralis } = useMoralis();
	const { sfProvider, initialiseSf, sf, sfSigner } = useContext(Web3Context);
	const {
		Units,
		web3Library: { BigNumber },
	} = Moralis;
	const toast = useToast();

	useEffect(() => {
		if (!sfProvider && isWeb3Enabled) {
			initialiseSf();
			console.log('initialiseSf');
		}
	}, [isWeb3Enabled, initialiseSf, sfProvider]);

	const [selectedToken, setSelectedToken] = useState();
	const rateInputRef = useRef();

	// stream rate is in tokens per month of type string. convert to BN for calculations
	const [streamRate, setStreamRate] = useState('0');
	const [existingStreamRate, setExistingStreamRate] = useState('0');

	useEffect(() => {
		if (sf && selectedToken && !selectedToken?.superToken) {
			const { superTokenAddress } = selectedToken;

			sf.loadSuperToken(superTokenAddress).then(async (superToken) => {
				setSelectedToken({ ...selectedToken, superToken });
			});
		}
	}, [poolData, selectedToken, sf, sfProvider, account]);

	// fetch existing flow data for selected token
	useEffect(() => {
		if (poolData && selectedToken?.superToken)
			selectedToken?.superToken
				.getFlow({
					sender: account,
					receiver: poolData.superPoolAddress,
					providerOrSigner: sfProvider,
				})
				.then(({ flowRate }) => {
					const formattedRate = Number(
						Units.FromWei(
							BigNumber.from(flowRate)
								.mul(30 * 86400)
								.toString()
						)
					).toFixed(5);
					setExistingStreamRate(formattedRate);
					setStreamRate(formattedRate);
				});
	}, [Moralis, account, poolData, selectedToken, sfProvider]);

	const { data: bufferObject, fetch: calcBufferTransferAmount } =
		useWeb3ExecuteFunction(
			{
				functionName: 'calcBufferTransferAmount',
				abi: dhedgeCoreAbi,
				contractAddress: poolData?.superPoolAddress,
				params: {
					_user: account,
					_superToken: selectedToken?.superTokenAddress,
					_streamAction: 1,
					_delay: 60 * 10, //in seconds
					_flowRate: BigNumber.from(Units.ETH(streamRate ?? '0')).div(
						30 * 86400
					),
				},
			},
			{
				autoFetch: true,
			},
			[poolData, account, selectedToken, streamRate]
		);

	const { data: tokenDistObj, fetch: getTokenDistIndices } =
		useWeb3ExecuteFunction(
			{
				functionName: 'getTokenDistIndices',
				abi: dhedgeCoreAbi,
				contractAddress: poolData?.superPoolAddress,
				params: {
					_underlyingToken: selectedToken?.address,
				},
			},
			{
				autoFetch: true,
			}
		);

	const createStream = async () => {
		const flowOptions = {
			superToken: selectedToken?.superTokenAddress,
			receiver: poolData?.superPoolAddress,
			flowRate: BigNumber.from(Units.ETH(streamRate ?? '0'))
				.div(30 * 86400)
				.toString(),
		};
		const createFlowOp = sf.cfaV1.createFlow(flowOptions);
		const tokenDistObj = await getTokenDistIndices();
		const tokenDistIndex =
			tokenDistObj[3] === tokenDistObj[0] ? tokenDistObj[1] : tokenDistObj[0];

		const approveOp = sf.idaV1.approveSubscription({
			indexId: tokenDistIndex,
			superToken: poolData?.poolSuperToken, // DHPTx
			publisher: poolData?.superPoolAddress,
		});

		await sf
			.batchCall([createFlowOp, approveOp])
			.exec(sfSigner)
			.then(() => {
				toast({
					title: 'Stream created',
					description: 'Your stream has been created',
					status: 'success',
					duration: 9000,
					isClosable: true,
				});
			});
	};

	// 1. Calculate buffer transfer amount.
	// 2. If current stream rate < new stream rate:
	//	- Check if allowance is there to transfer the buffer amount.
	//	- If not, get approval for supertoken.
	// 3. Create an update stream object.
	// 4. If shares in locked index are greater than 0 AND last distribution for the locked index was greater than 24 hours.
	//	- Approve the subscription in the unlocked permanent index.
	//	- Approve the subscription in temporary index.
	const updateStream = async () => {
		const txs = [];
		if (streamRate > existingStreamRate) {
			const poolSuperTokenAllowance = await selectedToken.superToken.allowance({
				owner: account,
				spender: poolData.superPoolAddress,
				providerOrSigner: sfSigner,
			});
			if (
				BigNumber.from(poolSuperTokenAllowance).lt(bufferObject._transferAmount)
			) {
				txs.push(
					selectedToken.superToken.approve({
						receiver: poolData.superPoolAddress,
						amount: bufferObject._transferAmount,
						providerOrSigner: sfSigner,
					})
				);
			}
		}
		const updateStreamOp = sf.cfaV1.updateFlow({
			superToken: selectedToken?.superTokenAddress,
			receiver: poolData?.superPoolAddress,
			flowRate: BigNumber.from(Units.ETH(streamRate ?? '0')).div(30 * 86400),
		});
		txs.push(updateStreamOp);

		await sf
			.batchCall(txs)
			.exec(sfSigner)
			.then(() => {
				toast({
					title: 'Stream updated',
					description: 'Your stream has been updated',
					status: 'success',
					duration: 9000,
					isClosable: true,
				});
			});

		const tokenDistObj = await getTokenDistIndices();
		const alternatePermIndexId =
			tokenDistObj[3] === tokenDistObj[0] ? tokenDistObj[1] : tokenDistObj[0];

		const alternatePermIndexSubObj = await sf.idaV1.getSubscription({
			superToken: poolData?.poolSuperToken,
			publisher: poolData?.superPoolAddress,
			indexId: alternatePermIndexId,
			subscriber: account,
			providerOrSigner: sfProvider,
		});

		const temporaryIndexSubObj = await sf.idaV1.getSubscription({
			superToken: poolData?.poolSuperToken,
			publisher: poolData?.superPoolAddress,
			indexId: tokenDistObj[2],
			subscriber: account,
			providerOrSigner: sfProvider,
		});

		const approvalTxs = [];
		if (
			!alternatePermIndexSubObj.approved &&
			alternatePermIndexSubObj.units > 0
		) {
			const approveOp = sf.idaV1.approveSubscription({
				indexId: alternatePermIndexId,
				superToken: poolData?.poolSuperToken, // DHPTx
				publisher: poolData?.superPoolAddress,
				providerOrSigner: sfProvider,
			});

			approvalTxs.push(approveOp);
		}

		if (!temporaryIndexSubObj.approved && temporaryIndexSubObj.units > 0) {
			const approveOp = sf.idaV1.approveSubscription({
				indexId: tokenDistObj[2],
				superToken: poolData?.poolSuperToken, // DHPTx
				publisher: poolData?.superPoolAddress,
				providerOrSigner: sfProvider,
			});

			approvalTxs.push(approveOp);
		}

		if (approvalTxs.length > 1)
			await sf
				.batchCall(approvalTxs)
				.exec(sfSigner)
				.then(() => {
					toast({
						title: 'Approved subscriptions',
						status: 'success',
						duration: 9000,
						isClosable: true,
					});
				});
		else if (approvalTxs.length === 1)
			await sf
				.batchCall(approvalTxs)
				.exec(sfSigner)
				.then(() => {
					toast({
						title: 'Approved subscriptions',
						status: 'success',
						duration: 9000,
						isClosable: true,
					});
				});
	};

	// periodically calculate buffer amount
	useInterval(() => {
		calcBufferTransferAmount();
	}, 10 * 1000);

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
				tokenName={selectedToken?.symbol}
				bufferAmount={Number(
					Units.FromWei(bufferObject?._transferAmount?.toString() ?? '0')
				).toFixed(5)}
				isTaken={bufferObject?._isTaken}
			/>

			<Spacer />

			<Button
				colorScheme={'blue'}
				disabled={existingStreamRate === streamRate}
				onClick={() =>
					Number(existingStreamRate) === 0 ? createStream() : updateStream()
				}
			>
				{existingStreamRate > 0 ? `Edit` : `Start`} Stream
			</Button>
		</VStack>
	);
};

export default CreateStream;
