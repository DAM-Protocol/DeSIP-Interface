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
} from '@chakra-ui/react';
import { useContext, useEffect, useMemo, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useMoralis, useWeb3Contract } from 'react-moralis';
import { dhedgeCoreAbi } from '../../../abi/dhedgeCore';
import { Web3Context } from '../../../context/Web3Context';

const AssetTable = ({ poolData }) => {
	const { account } = useMoralis();
	const { sf } = useContext(Web3Context);
	const [streams, setStreams] = useState();

	useEffect(() => {
		if (sf && poolData) {
			sf.query
				.listStreams({
					// sender: account,
					sender: '0x452181dae31cf9f42189df71ec64298993bee6d3',
					receiver: poolData.superPoolAddress,
				})
				.then((res) => {
					setStreams(res?.data);
				});
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

	return (
		<Table size='sm' variant='unstyled'>
			<Thead
				position='sticky'
				top='0'
				bg={useColorModeValue('bg.white.50', 'bg.dark.950')}
				zIndex='9'
			>
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
				{streams?.length &&
					streams.map((stream) => {
						return (
							<StreamRow
								key={stream.id}
								hasLoaded
								stream={stream}
								depositSuperTokens={depositSuperTokens}
							/>
						);
					})}
				{!streams?.length && <StreamRow />}
			</Tbody>
		</Table>
	);
};

const StreamRow = ({ stream, depositSuperTokens, hasLoaded }) => {
	const { Moralis, isWeb3Enabled } = useMoralis();

	const { data, runContractFunction, isLoading } = useWeb3Contract({
		contractAddress: stream?.receiver,
		abi: dhedgeCoreAbi,
		functionName: 'calcUserUninvested',
		params: {
			_user: '0x452181dae31cf9f42189df71ec64298993bee6d3',
			_token: stream?.token.id,
		},
	});

	useEffect(() => {
		(async () => {
			if (stream && isWeb3Enabled) {
				runContractFunction().then(console.log);
			}
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
					{(fromWei(stream?.currentFlowRate) * 86400 * 30).toFixed(2) || '---'}
				</Skeleton>
			</Td>

			{/* Total Streamed */}
			<Td textAlign='center'>
				<Skeleton as={Text} isLoaded={hasLoaded}>
					{(
						fromWei(stream?.streamedUntilUpdatedAt) +
						fromWei(stream?.currentFlowRate) *
							(Date.now() / 1000 - stream?.updatedAtTimestamp)
					).toFixed(2) || '---'}
				</Skeleton>
			</Td>

			<Td textAlign='center'>
				<Skeleton as={Text} isLoaded={isLoading}>
					{data || '---'}
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

export default AssetTable;
