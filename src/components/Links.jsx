import { forwardRef, Link } from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';

const InternalLink = forwardRef(({ children, to, ...rest }, ref) => (
	<Link as={ReactLink} to={to || '/'} ref={ref} {...rest}>
		{children}
	</Link>
));
const ExternalLink = forwardRef(({ children, href, ...rest }, ref) => (
	<Link href={href} isExternal {...rest}>
		{children}
	</Link>
));

export { InternalLink, ExternalLink };
