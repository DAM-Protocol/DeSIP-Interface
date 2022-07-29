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
} from '@chakra-ui/react';
import { useContext, useEffect, useMemo, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useMoralis, useWeb3Contract } from 'react-moralis';
import { dhedgeCoreAbi } from '../../../abi/dhedgeCore';
import { Web3Context } from '../../../context/Web3Context';

const StreamTable = ({ poolData }) => {
	const { account } = useMoralis();
	const { sf } = useContext(Web3Context);
	const [streams, setStreams] = useState();

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

	return (
		<>
			{streams?.length ? (
				<Table size='sm' variant='unstyled'>
					<Thead position='sticky' top='0' bg={headBg} zIndex='9'>
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

const StreamRow = ({ stream, depositSuperTokens, hasLoaded }) => {
	const { Moralis, isWeb3Enabled } = useMoralis();

	const {
		data,
		runContractFunction,
		isLoading: isUninvestedDataLoading,
		isFetching: isUninvestedFetching,
	} = useWeb3Contract({
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
		(async () => {
			if (stream && isWeb3Enabled) runContractFunction();
		})();
	}, [stream, isWeb3Enabled, runContractFunction, Moralis]);

	const fromWei = (number = 0, decimals = 18) => {
		return Number(Moralis.Units.FromWei(number, decimals));
	};

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
					{fromWei(stream?.currentFlowRate) * 86400 * 30 || '---'}
				</Skeleton>
			</Td>

			{/* Total Streamed */}
			<Td textAlign='center'>
				<Skeleton as={Text} isLoaded={hasLoaded}>
					{fromWei(stream?.streamedUntilUpdatedAt) +
						fromWei(stream?.currentFlowRate) *
							(Date.now() / 1000 - stream?.updatedAtTimestamp) || '---'}
				</Skeleton>
			</Td>

			<Td textAlign='center'>
				<Skeleton
					as={Text}
					isLoaded={!isUninvestedDataLoading && !isUninvestedFetching}
				>
					{fromWei(data?.toString()) || '---'}
				</Skeleton>
			</Td>

			<Td textAlign='center'>
				<Button variant='ghost' colorScheme='yellow' p='2'>
					<Icon as={AiOutlineEdit}></Icon>
				</Button>{' '}
				<Button variant='ghost' colorScheme='red' p='2'>
					<Icon as={AiOutlineDelete}></Icon>
				</Button>
			</Td>
		</Tr>
	);
};

export default StreamTable;
