import { useState, useCallback } from 'react';
import { useMoralis } from 'react-moralis';

const useSuperfluid = () => {
	const [sf, setSf] = useState(null);
	const { Moralis, isWeb3Enabled } = useMoralis();

	const [sfProvider, setSfProvider] = useState(null);

	const initialiseSf = useCallback(async () => {
		import('@superfluid-finance/sdk-core/dist/main/Framework').then(
			async ({ default: Framework }) => {
				if (!isWeb3Enabled) return null;
				const ethers = Moralis.web3Library;
				const mmProvider = new ethers.providers.Web3Provider(window.ethereum);
				const _sf = await Framework.create({
					dataMode: 'SUBGRAPH_WEB3',
					networkName: 'matic',
					provider: mmProvider,
				}).catch(console.log);
				setSfProvider(mmProvider);
				setSf(_sf);
			}
		);
	}, [isWeb3Enabled, Moralis]);

	return { sfProvider, sf, initialiseSf };
};

export default useSuperfluid;
