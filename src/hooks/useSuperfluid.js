import { useState, useCallback } from 'react';
import { useMoralis } from 'react-moralis';

const useSuperfluid = ({ supportedChains }) => {
	const { Moralis, isWeb3Enabled, chainId } = useMoralis();

	const [sf, setSf] = useState(null);
	const [sfProvider, setSfProvider] = useState(null);
	const [sfSigner, setSfSigner] = useState(null);

	const initialiseSf = useCallback(async () => {
		if (!supportedChains.includes(chainId)) {
			throw new Error(`Chain ${chainId} is not supported`);
		}
		if (!sfProvider && !sfSigner && !sf) {
			console.log('Intitialising Superfluid');
			await import('@superfluid-finance/sdk-core/dist/main/Framework').then(
				async ({ default: Framework }) => {
					if (!isWeb3Enabled && !Moralis) return null;
					const ethers = Moralis.web3Library;
					const mmProvider = new ethers.providers.Web3Provider(window.ethereum);

					const _sf = await Framework.create({
						dataMode: 'SUBGRAPH_WEB3',
						networkName: 'matic',
						provider: mmProvider,
					}).catch((e) => console.log(e));

					if (_sf) {
						const signer = _sf.createSigner({
							web3Provider: mmProvider,
						});
						setSfSigner(signer);
						setSfProvider(mmProvider);
						setSf(_sf);
					}
				}
			);
		}
	}, [
		supportedChains,
		chainId,
		sfProvider,
		sfSigner,
		sf,
		isWeb3Enabled,
		Moralis,
	]);

	return { sfProvider, sf, initialiseSf, sfSigner };
};

export default useSuperfluid;
