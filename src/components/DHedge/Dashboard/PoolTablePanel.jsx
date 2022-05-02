import { Box, Divider } from '@chakra-ui/react';
import AssetTable from './AssetTable';

const PoolTablePanel = ({ poolAssets }) => {
	return (
		<Box borderRadius='10' pt='6' overflow='scroll'>
			<Divider mb='4' mt='-6' />
			<AssetTable poolAssets={poolAssets} />
		</Box>
	);
};

export default PoolTablePanel;
