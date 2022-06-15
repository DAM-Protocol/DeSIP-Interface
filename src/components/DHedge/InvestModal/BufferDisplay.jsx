import { Text, Divider, Flex, Tooltip } from '@chakra-ui/react';

const BufferDisplay = ({ tokenName = 'ETH', bufferAmount = 0 }) => {
	return (
		<Flex w='100%' gap='4' align='end'>
			<Text as='label'>Buffer Adjustment</Text>
			<Tooltip></Tooltip>
			<Divider flex='1' mb='1' />
			<Text
				as='span'
				w='fit-content'
				color={bufferAmount >= 0 ? 'orange.400' : 'green.400'}
			>
				{bufferAmount >= 0 ? '+' : '-'} {bufferAmount ?? '0' + ` ${tokenName}x`}
			</Text>
		</Flex>
	);
};

export default BufferDisplay;
