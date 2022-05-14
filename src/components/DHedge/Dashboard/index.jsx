import { Box } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import { Web3Context } from '../../../context/Web3Context';

import PoolTableItem from './PoolTableItem';

const DHedgeDashboard = () => {
	const { pools, getDhedgePools, sfProvider, initialiseSf } =
		useContext(Web3Context);

	const { isWeb3Enabled } = useMoralis();
	useEffect(() => {
		if (!sfProvider && isWeb3Enabled) initialiseSf();
	}, [isWeb3Enabled, initialiseSf, sfProvider]);

	useEffect(() => {
		if (getDhedgePools) getDhedgePools();
	}, [getDhedgePools]);

	return (
		<Box overflowX='auto'>
			{/* Pool Table */}

			{pools?.map((pool, index) => (
				<PoolTableItem key={pool.id} poolData={pool.attributes} />
			))}
		</Box>
	);
};

export default DHedgeDashboard;
