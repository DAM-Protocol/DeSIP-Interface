const syncDhedgeAssets = async (request) => {
	const data = JSON.stringify(assetsQuery);
	const logger = Moralis.Cloud.getLogger();

	try {
		const httpResponse = await Moralis.Cloud.httpRequest({
			method: 'POST',
			url: `https://api-v2.dhedge.org/graphql`,
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: data,
		}).then(
			async function (httpResponse) {
				let dataObj = httpResponse.data;
				dataObj = JSON.stringify(dataObj);
				dataObj = JSON.parse(dataObj);

				const assets = dataObj.data.assets;
				// logger.info(`Found ${assets.length} assets`);

				// filter assets with chainID polygon
				const filteredAssets = assets.filter(
					(asset) => asset.blockchainCode === 'POLYGON'
				);

				// logger.info(
				// 	`Filtered ${assets.length} assets to ${filteredAssets.length}`
				// );

				// use filteredAssets address as key
				const assetsByAddress = filteredAssets.reduce((assets, asset) => {
					assets[asset.address] = asset;
					return assets;
				}, {});

				const DhedgeAsset = Moralis.Object.extend('DhedgeAsset');

				for (const assetAddress in assetsByAddress) {
					const {
						blockchainCode,
						address,
						id,
						name,
						type,
						precision,
						rate,
						description,
					} = assetsByAddress[assetAddress];

					const query = new Moralis.Query(DhedgeAsset);
					const existingAsset = await query
						.fullText('address', address)
						.first({ useMasterKey: true });

					if (existingAsset) {
						existingAsset.set('blockchainCode', blockchainCode);
						existingAsset.set('address', address);
						existingAsset.set('assetId', id);
						existingAsset.set('name', name);
						existingAsset.set('type', type);
						existingAsset.set('precision', precision);
						existingAsset.set('rate', rate);
						existingAsset.set('description', description);
						await existingAsset.save().then(
							(object) => {
								logger.info('Asset Updated with objectId: ' + object.id);
							},
							(error) => {
								logger.info(
									'Error creating asset for ' + address + ' ' + error.message
								);
							}
						);
					} else {
						const DhedgeAsset = Moralis.Object.extend('DhedgeAsset');
						const newAsset = new DhedgeAsset();

						newAsset.set('blockchainCode', blockchainCode);
						newAsset.set('address', address);

						newAsset.set('assetId', id);
						newAsset.set('name', name);
						newAsset.set('type', type);
						newAsset.set('precision', precision);
						newAsset.set('rate', rate);
						newAsset.set('description', description);

						await newAsset.save(null, { useMasterKey: true }).then(
							(object) => {
								logger.info('New asset created with objectId: ' + object.id);
							},
							(error) => {
								logger.info(
									'Error creating asset for ' + address + ' ' + error.message
								);
							}
						);
					}
				}
			},
			function (httpResponse) {
				logger.error(
					'Request failed with response code ' + httpResponse.status
				);
			}
		);
	} catch (e) {
		logger.error(e);
	}

	request.message('Sync Dhedge Assets Completed');
};
