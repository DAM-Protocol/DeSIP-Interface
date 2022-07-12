import { Text, Divider, Flex, Tooltip } from '@chakra-ui/react';

const BufferDisplay = ({ tokenName = 'ETH', bufferAmount = 0, isTaken }) => {
	return (
		<Flex w='100%' gap='4' align='end'>
			<Text as='label'>Buffer Adjustment</Text>
			{/* <Tooltip>Hello</Tooltip> */}
			<Divider flex='1' mb='1' />
			<Text
				as='span'
				w='fit-content'
				color={!isTaken ? 'green.400' : 'orange.400'}
			>
				{!isTaken ? '+' : '-'} {(bufferAmount ?? '0') + ` ${tokenName}x`}
			</Text>
		</Flex>
	);
};

export default BufferDisplay;
