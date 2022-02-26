import { Box } from '@chakra-ui/react';
import AssetTable from '../Dashboard/AssetTable';

const ActiveStreams = ({ poolAssets }) => {
	return (
		<Box overflow='auto'>
			<AssetTable poolAssets={poolAssets}></AssetTable>
		</Box>
	);
};

export default ActiveStreams;
