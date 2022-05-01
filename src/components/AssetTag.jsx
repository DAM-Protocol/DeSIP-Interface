import { Tag, TagLabel, Avatar } from '@chakra-ui/react';

const AssetTag = ({ name, icon }) => (
	<Tag size='lg' variant='subtle' colorScheme='blue' borderRadius='full' my='2'>
		<Avatar
			src={icon}
			backgroundColor='gray.200'
			size='xs'
			name={icon}
			ml={-1}
			mr={2}
			colorScheme='blue'
		/>
		<TagLabel>{name}</TagLabel>
	</Tag>
);

export default AssetTag;
