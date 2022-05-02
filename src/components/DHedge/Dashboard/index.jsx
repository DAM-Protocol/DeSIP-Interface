import { Box } from '@chakra-ui/react';

import PoolTableItem from './PoolTableItem';

const DHedgeDashboard = () => {
	return (
		<Box overflowX='auto'>
			{/* Pool Table */}

			<PoolTableItem />
			<PoolTableItem />
			<PoolTableItem />
			<PoolTableItem />
		</Box>
	);
};

export default DHedgeDashboard;
