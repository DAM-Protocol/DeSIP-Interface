import { Framework } from '@superfluid-finance/sdk-core';
import { createContext, useState, useMemo } from 'react';
import { useMoralis, useMoralisWeb3Api, useMoralisQuery } from 'react-moralis';
import { useEffect } from 'react';

const Web3Context = createContext({
	web3: null,
	chainId: null,
});

const Web3ContextProvider = ({ children }) => {
	const {
		Moralis,
		isAuthenticated,
		enableWeb3,
		isWeb3Enabled,
		isWeb3EnableLoading,
	} = useMoralis();

	useEffect(() => {
		window.Moralis = Moralis;
	});

	useEffect(() => {
		if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated, isWeb3Enabled]);
	// const {
	// 	web3,
	// 	Moralis,
	// 	isAuthenticated,
	// 	enableWeb3,
	// 	isWeb3Enabled,
	// 	isWeb3EnableLoading,
	// } = useMoralis();
	// const [sf, setSf] = useState(null);
	// const [sfProvider, setSfProvider] = useState(null);

	// useEffect(() => {
	// 	if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
	// }, [isAuthenticated, isWeb3Enabled, isWeb3EnableLoading]);

	// useEffect(() => {
	// 	(async () => {
	// 		if (!isWeb3Enabled) return null;

	// 		const ethers = Moralis.web3Library;
	// 		const mmProvider = new ethers.providers.Web3Provider(window.ethereum);

	// 		const _sf = await Framework.create({
	// 			networkName: 'polygon',
	// 			provider: mmProvider,
	// 		});
	// 		setSfProvider(mmProvider);
	// 		setSf(_sf);
	// 	})();
	// }, [isWeb3Enabled, web3]);

	// Moralis Queries
	// const {
	// 	fetch: getDhedgeAssets,
	// 	data: dhedgeAssets,
	// 	error: dhedgeAssetsError,
	// } = useMoralisQuery('DhedgeAsset', (query) => query.find(), [], {
	// 	autoFetch: false,
	// });

	return (
		<Web3Context.Provider
			value={{}}
			// value={{
			// 	sf: sf,
			// 	sfProvider,
			// 	isWeb3Enabled,
			// }}
		>
			{children}
		</Web3Context.Provider>
	);
};

export { Web3Context, Web3ContextProvider };
