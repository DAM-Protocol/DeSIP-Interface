import {
	Td,
	Table,
	Th,
	Tr,
	Tbody,
	Thead,
	Badge,
	Button,
	Icon,
	Text,
	useColorModeValue,
	Skeleton,
	Flex,
	useInterval,
	useToast,
} from '@chakra-ui/react';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis';
import { dhedgeCoreAbi } from '../../../abi/dhedgeCore';
import { Web3Context } from '../../../context/Web3Context';
import decimalFormatter from '../../../utils/decimalFormatter';

const StreamTable = ({ poolData, setSelectedToken }) => {
	const { account } = useMoralis();
	const { sf, sfSigner } = useContext(Web3Context);
	const [streams, setStreams] = useState();
	const toast = useToast();

	useEffect(() => {
		if (sf && poolData) {
			sf.query
				.listStreams({
					sender: account,
					receiver: poolData.superPoolAddress,
				})
				.then((res) => {
					setStreams(res?.data);
				})
				.catch((e) => console.log('fetch streams failed', e));
		}
	}, [sf, poolData]);

	const depositSuperTokens = useMemo(() => {
		// array of erc20 token addresses
		const supportedDepositTokens = poolData?.supportedDepositTokens;

		// object with erc20 address key and supertoken address value
		const supportedSuperTokens = poolData?.supportedSuperTokens;

		if (supportedDepositTokens && supportedSuperTokens) {
			// return common supertokens
			return supportedDepositTokens.reduce((acc, curr) => {
				if (supportedSuperTokens[curr]) {
					acc[supportedSuperTokens[curr]] = curr;
				}
				return acc;
			}, {});
		} else return {};
	}, [poolData]);

	const headBg = useColorModeValue('bg.white.50', 'bg.dark.950');

	const handleDeleteStream = useCallback(
		async (superTokenAddress) => {
			// delete superdfluid stream
			sf.cfaV1
				.deleteFlow({
					sender: account,
					receiver: poolData.superPoolAddress,
					superToken: superTokenAddress,
				})
				.exec(sfSigner)
				.then(() => {
					toast({
						title: 'Stream deleted',
						description: 'Stream has been deleted',
						status: 'success',
						duration: 9000,
						isClosable: true,
					});
				})
				.catch((e) => {
					toast({
						title: 'Stream could not be deleted',
						description: 'Check console for errors',
						status: 'error',
						duration: 9000,
						isClosable: true,
					});
					console.error(e);
				});
		},
		[account, poolData, sf, toast]
	);

	return (
		<>
			{streams?.length ? (
				<Table size='sm' variant='unstyled'>
					<Thead position='sticky' top='0' zIndex='9'>
						<Tr>
							<Th textAlign='center'>Asset</Th>
							<Th textAlign='center'>
								Rate{' '}
								<Text as='sub' opacity='0.7'>
									(/month)
								</Text>{' '}
							</Th>
							<Th textAlign='center'>Streamed</Th>
							<Th textAlign='center'>Uninvested</Th>
							<Th textAlign='center'>Controls</Th>
						</Tr>
					</Thead>
					<Tbody>
						{streams?.length ? (
							streams.map((stream) => {
								return (
									<StreamRow
										key={stream.id}
										hasLoaded
										stream={stream}
										depositSuperTokens={depositSuperTokens}
										handleDeleteStream={handleDeleteStream}
										setSelectedToken={setSelectedToken}
									/>
								);
							})
						) : (
							<>
								<StreamRow />
								<StreamRow />
							</>
						)}
					</Tbody>
				</Table>
			) : (
				<Flex justify='center'>No Active Streams</Flex>
			)}
		</>
	);
};

const StreamRow = ({
	stream,
	depositSuperTokens,
	hasLoaded,
	handleDeleteStream,
	setSelectedToken,
}) => {
	const { Moralis, isWeb3Enabled } = useMoralis();

	const {
		data: userUninvested,
		fetch: calcUserUninvested,
		isLoading: isUninvestedDataLoading,
	} = useWeb3ExecuteFunction({
		contractAddress: stream?.receiver,
		abi: dhedgeCoreAbi,
		functionName: 'calcUserUninvested',
		params: {
			_user: stream?.sender,
			_superToken: stream?.token.id,
			_delay: 10,
		},
	});

	useEffect(() => {
		if (stream && isWeb3Enabled && calcUserUninvested) calcUserUninvested();
	}, [stream, isWeb3Enabled, calcUserUninvested, Moralis]);

	const fromWei = (number = 0, decimals = 18) => {
		return Number(Moralis.Units.FromWei(number, decimals));
	};

	useInterval(() => {
		if (stream && isWeb3Enabled && calcUserUninvested) calcUserUninvested();
	}, 1000);

	return (
		<Tr>
			<Td textAlign='center'>
				<Badge
					borderRadius={'sm'}
					p='2'
					colorScheme={depositSuperTokens?.[stream?.token.id] ? 'green' : 'red'}
				>
					{stream?.token.symbol || '---'}
				</Badge>
			</Td>

			{/* Current Flow Rate */}
			<Td textAlign='center'>
				<Skeleton as={Text} isLoaded={hasLoaded}>
					{decimalFormatter(fromWei(stream?.currentFlowRate) * 86400 * 30) ||
						'---'}
				</Skeleton>
			</Td>

			{/* Total Streamed */}
			<Td textAlign='center'>
				<Skeleton as={Text} isLoaded={hasLoaded}>
					{decimalFormatter(
						fromWei(stream?.streamedUntilUpdatedAt) +
							fromWei(stream?.currentFlowRate) *
								(Date.now() / 1000 - stream?.updatedAtTimestamp)
					) || '---'}
				</Skeleton>
			</Td>

			<Td textAlign='center'>
				<Skeleton as={Text} isLoaded={!isUninvestedDataLoading}>
					{decimalFormatter(fromWei(userUninvested?.toString())) || '---'}
				</Skeleton>
			</Td>

			<Td textAlign='center'>
				<Button
					variant='ghost'
					colorScheme='yellow'
					p='2'
					onClick={() => setSelectedToken(stream?.token.id)}
				>
					<Icon as={AiOutlineEdit}></Icon>
				</Button>{' '}
				<Button
					variant='ghost'
					colorScheme='red'
					p='2'
					onClick={() => handleDeleteStream(stream.token.id)}
				>
					<Icon as={AiOutlineDelete}></Icon>
				</Button>
			</Td>
		</Tr>
	);
};

export default StreamTable;
