import { Tag, TagLabel, Avatar } from '@chakra-ui/react';

const AssetTag = ({ name, icon }) => (
	<Tag size='lg' variant='subtle' colorScheme='blue' borderRadius='full' my='2'>
		<Avatar src={icon} size='xs' name={name} ml={-1} mr={2} />
		<TagLabel>{name}</TagLabel>
	</Tag>
);

export default AssetTag;
