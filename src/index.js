import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MoralisProvider } from 'react-moralis';

const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;

const Application = () => {
	const isServerInfo = APP_ID && SERVER_URL ? true : false;
	//Validate
	if (!APP_ID || !SERVER_URL)
		throw new Error(
			'Missing Moralis Application ID or Server URL. Make sure to set your .env file.'
		);
	if (isServerInfo)
		return (
			<MoralisProvider
				appId={APP_ID}
				serverUrl={SERVER_URL}
				initializeOnMount={true}
			>
				<App />
			</MoralisProvider>
		);
	else {
		return <div>Error loading Moralis. Make sure to set your .env file.</div>;
	}
};

ReactDOM.render(
	<StrictMode>
		<ColorModeScript />
		<Application />
	</StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
