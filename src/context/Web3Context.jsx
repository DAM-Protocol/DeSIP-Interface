import { createContext, useMemo } from 'react';
import { useMoralis, useMoralisQuery } from 'react-moralis';
import { useEffect } from 'react';
import useSuperfluid from '../hooks/useSuperfluid';

const Web3Context = createContext({
	web3: null,
	chainId: null,
	pools: null,
	getDhedgePools: () => {},
	dhedgeAssets: null,
	assetLookup: null,
	poolsError: null,
	dhedgeAssetsError: null,
	isLoadingPools: null,
	sfProvider: null,
	sf: null,
	initialiseSf: () => {},
});

const Web3ContextProvider = ({ children }) => {
	const { sfProvider, sf, initialiseSf, sfSigner } = useSuperfluid({
		supportedChains: ['0x89'],
	});

	// Moralis Queries
	const {
		fetch: getDhedgeAssets,
		data: dhedgeAssets,
		error: dhedgeAssetsError,
	} = useMoralisQuery('DhedgeAsset', (query) => query.ascending('name'), [], {
		autoFetch: false,
	});
	useEffect(() => {
		getDhedgeAssets();
	}, [getDhedgeAssets]);

	const assetLookup = useMemo(() => {
		if (!dhedgeAssets) return null;
		return dhedgeAssets.reduce((acc, asset) => {
			acc[asset.attributes?.address] = asset.attributes;
			return acc;
		}, {});
	}, [dhedgeAssets]);

	const {
		fetch: getDhedgePools,
		data: pools,
		error: poolsError,
		isLoading: isLoadingPools,
	} = useMoralisQuery(
		'SuperDhedgePool',
		(query) => query.ascending('leaderboardRank').limit(25),
		[],
		{ autoFetch: false }
	);

	return (
		<Web3Context.Provider
			value={{
				pools,
				getDhedgePools,
				dhedgeAssets,
				assetLookup,
				poolsError,
				dhedgeAssetsError,
				isLoadingPools,
				sfProvider,
				sf,
				sfSigner,
				initialiseSf,
			}}
		>
			{children}
		</Web3Context.Provider>
	);
};

export { Web3Context, Web3ContextProvider };
