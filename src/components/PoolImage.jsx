import { Box, Image } from '@chakra-ui/react';

const PoolImage = ({ imageURL, card }) => {
	return (
		<Box
			rounded={'sm'}
			mt={card ? -12 : 0}
			pos={'relative'}
			h={card ? 20 : 24}
			w={card ? 20 : 24}
			mx={'auto'}
			filter={'drop-shadow(0px 0px 10px #0000001d)'}>
			<Image
				rounded={'lg'}
				h={card ? 20 : 24}
				w={card ? 20 : 24}
				objectFit={'cover'}
				src={imageURL}
				fallback={
					<Box
						rounded={'lg'}
						background={'gray.500'}
						h={card ? 20 : 24}
						fontSize='sm'>
						Image Unavailable
					</Box>
				}
			/>
		</Box>
	);
};
export default PoolImage;
