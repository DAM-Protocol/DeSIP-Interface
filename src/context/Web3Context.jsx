import { Framework } from '@superfluid-finance/sdk-core';
import { createContext, useState, useMemo } from 'react';
import {
	useMoralis,
	useMoralisWeb3Api,
	useMoralisQuery,
	useMoralisSubscription,
} from 'react-moralis';
import { useEffect } from 'react';

const Web3Context = createContext({
	web3: null,
	chainId: null,
});

const Web3ContextProvider = ({ children }) => {
	const { web3, Moralis, isWeb3Enabled } = useMoralis();
	const [sf, setSf] = useState(null);
	const [sfProvider, setSfProvider] = useState(null);

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
	const {
		fetch: getDhedgeAssets,
		data: dhedgeAssets,
		error: dhedgeAssetsError,
	} = useMoralisQuery('DhedgeAsset', (query) => query.ascending('name'), [], {
		autoFetch: false,
	});
	const {
		fetch: getDhedgePools,
		data: pools,
		error: poolsError,
		isLoading: isLoadingPools,
	} = useMoralisQuery('SuperDhedgePool', (query) =>
		query.ascending('leaderboardRank').limit(25)
	);

	return (
		<Web3Context.Provider
			value={{
				pools,
				getDhedgePools,
				dhedgeAssets,
				poolsError,
				dhedgeAssetsError,
				isLoadingPools,
			}}
		>
			{children}
		</Web3Context.Provider>
	);
};

export { Web3Context, Web3ContextProvider };
