const syncDhedgeAssets = async (request) => {
	const data = JSON.stringify(assetsQuery);

	log.info('LOG - INSIDE syncDhedgeAssets');

	const httpResponse = await Moralis.Cloud.httpRequest({
		method: 'POST',
		url: `https://api-v2.dhedge.org/graphql`,
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: data,
	});

	// filter assets with chainID polygon
	const filteredAssets = httpResponse.body.data.assets.filter(
		(asset) => asset.blockchainCode === 'POLYGON'
	);

	// use filteredAssets address as key
	const assetsByAddress = filteredAssets.reduce((assets, asset) => {
		assets[asset.address] = asset;
		return assets;
	}, {});
	request.log.info(`dHEDGE Assets: ${assetsByAddress}`);

	// get all assets from db
	const Asset = Moralis.Object.extent('DhedgeAsset');
	const existingAssets = await Asset.find();

	for (const asset of existingAssets) {
		request.log.info(`Syncing dHEDGE Asset: ${asset.address}`);
		const assetData = asset.attributes;
		const {
			blockchainCode,
			address,
			id,
			name,
			type,
			precision,
			rate,
			description,
		} = assetData;

		if (assetsByAddress[address] && assetData !== assetsByAddress[address]) {
			asset.set('blockchainCode', blockchainCode);
			asset.set('address', address);
			asset.set('id', id);
			asset.set('name', name);
			asset.set('type', type);
			asset.set('precision', precision);
			asset.set('rate', rate);
			asset.set('description', description);
			asset.save(null, { useMasterKey: true });

			// log to console
			request.log.info(`Updated asset: ${asset.attributes.name}`);
		} else {
			const newAsset = new Asset();
			newAsset.set('blockchainCode', blockchainCode);
			newAsset.set('address', address);
			newAsset.set('id', id);
			newAsset.set('name', name);
			newAsset.set('type', type);
			newAsset.set('precision', precision);
			newAsset.set('rate', rate);
			newAsset.set('description', description);
			newSsset.save(null, { useMasterKey: true });

			// log to console
			request.log.info(`Added asset: ${name}`);
		}
	}

	return true;
};
