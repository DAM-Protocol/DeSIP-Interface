import { AccordionPanel, Divider } from '@chakra-ui/react';
import AssetTable from './AssetTable';

const PoolTablePanel = ({ poolAssets }) => {
	return (
		<AccordionPanel borderRadius='10' pt='6' overflow='scroll'>
			<Divider mb='4' mt='-6' />
			<AssetTable poolAssets={poolAssets} />
		</AccordionPanel>
	);
};

export default PoolTablePanel;
