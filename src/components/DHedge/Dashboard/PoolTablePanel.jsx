import { Box, Divider } from '@chakra-ui/react';
import StreamTable from './StreamTable';

const PoolTablePanel = ({ poolAssets }) => {
	return (
		<Box borderRadius='10' pt='6' overflow='scroll'>
			<Divider mb='4' mt='-6' />
			<StreamTable poolAssets={poolAssets} />
		</Box>
	);
};

export default PoolTablePanel;
