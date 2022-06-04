import { Button, Flex, Image, Spacer, Badge } from '@chakra-ui/react';
import React from 'react';

const TokenItem = ({
	address,
	icon,
	symbol,
	superTokenAddress,
	handleSelect,
}) => {
	return (
		<Flex
			as={Button}
			variant='ghost'
			onClick={() => handleSelect({ address, symbol, superTokenAddress, icon })}
			justify='space-between'
			width={'100%'}
		>
			<Image
				boxSize={'1.25rem'}
				borderRadius='50%'
				src={icon}
				alt={symbol}
				mr='6'
				fallbackSrc={
					'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-circle-outline-512.png'
				}
			/>
			<span>{symbol}</span>
			<Spacer />
			<Badge borderRadius='sm' p='2'>
				{symbol}x
			</Badge>
		</Flex>
	);
};

export default TokenItem;
