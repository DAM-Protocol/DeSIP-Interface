import { Box } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import { Web3Context } from '../../../context/Web3Context';

import PoolTableItem from './PoolTableItem';

const DHedgeDashboard = () => {
	const { pools, getDhedgePools, superfluidProvider, initialiseSf } =
		useContext(Web3Context);

	const { isWeb3Enabled } = useMoralis();
	useEffect(() => {
		if (!superfluidProvider && isWeb3Enabled) initialiseSf();
	}, [isWeb3Enabled, initialiseSf, superfluidProvider]);

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
