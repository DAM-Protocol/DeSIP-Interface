import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const config = {
	initialColorMode: 'dark',
};

const colors = {
	bg: {
		dark: {
			100: '#1a3f6e',
			600: '#152e4d',
			700: '#12263f',
			800: '#0d213c',
			900: '#0c192a',
			950: '#101329',
		},
		white: {
			50: '#fbfbfb',
		},
		gray: {
			100: '#f7f7f7',
		},
	},
};
const styles = {
	global: (props) => ({
		html: {
			fontSize: '16px',
		},
		body: {
			background: mode(
				"url('/bg-tile-light.png')",
				"url('/bg-tile-dark.png')"
			)(props),
			backgroundAttachment: 'fixed',
		},
	}),
};

const theme = extendTheme({
	config,
	colors,
	styles,
});

export default theme;
