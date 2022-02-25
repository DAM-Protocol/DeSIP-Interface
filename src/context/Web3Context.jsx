import { Framework } from '@superfluid-finance/sdk-core';
import { createContext, useState, useMemo } from 'react';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import { useEffect } from 'react';

const Web3Context = createContext({
	web3: null,
	chainId: null,
});

const Web3ContextProvider = ({ children }) => {
	const {
		web3,
		Moralis,
		isAuthenticated,
		enableWeb3,
		isWeb3Enabled,
		isWeb3EnableLoading,
	} = useMoralis();
	const [sf, setSf] = useState(null);
	const [sfProvider, setSfProvider] = useState(null);

	useEffect(() => {
		if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
	}, [isAuthenticated, isWeb3Enabled, isWeb3EnableLoading]);

	useEffect(() => {
		(async () => {
			if (!isWeb3Enabled) return null;

			const ethers = Moralis.web3Library;
			const mmProvider = new ethers.providers.Web3Provider(window.ethereum);

			const _sf = await Framework.create({
				networkName: 'polygon',
				provider: mmProvider,
			});
			setSfProvider(mmProvider);
			setSf(_sf);
		})();
	}, [isWeb3Enabled, web3]);

	return (
		<Web3Context.Provider
			value={{
				sf: sf,
				sfProvider,
				isWeb3Enabled,
			}}>
			{children}
		</Web3Context.Provider>
	);
};

export { Web3Context, Web3ContextProvider };
