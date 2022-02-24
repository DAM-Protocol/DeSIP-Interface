import { Box, Accordion } from '@chakra-ui/react';

import PoolTableItem from './PoolTableItem';

const DHedge = () => {
	return (
		<Box overflowX='auto'>
			<Accordion allowMultiple mx='auto'>
				<PoolTableItem />
				<PoolTableItem />
				<PoolTableItem />
				<PoolTableItem />
			</Accordion>
		</Box>
	);
};

export default DHedge;
