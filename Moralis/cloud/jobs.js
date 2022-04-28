const syncDhedgeAssets = async (request) => {
	request.message('Sync Dhedge Assets Started');

	const data = JSON.stringify({ query: assetsQuery });
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
				let dataObj = JSON.parse(httpResponse.text);

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

const syncDhedgeFunds = async (request) => {
	const logger = Moralis.Cloud.getLogger();

	// get all rows from SuperDhedgePool class
	const SuperDhedgePool = Moralis.Object.extend('SuperDhedgePool');
	const query = new Moralis.Query(SuperDhedgePool);
	const superDhedgePools = await query.find({ useMasterKey: true });

	// iterate over all funds
	try {
		for (const superDhedgePool of superDhedgePools) {
			const fundAddress = superDhedgePool.get('dhedgeFundAddress');

			const data = JSON.stringify({
				query: fundQuery,
				variables: `{
					"address": "${fundAddress}"
				}`,
			});
			logger.info('data: ' + data);

			const httpResponse = await Moralis.Cloud.httpRequest({
				method: 'POST',
				url: `https://api-v2.dhedge.org/graphql`,
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
				body: data,
			});
			logger.info(httpResponse.text);

			const {
				data: { fund: fundData },
			} = JSON.parse(httpResponse.text);

			// update row columns with fund data
			const supportedDepositTokens = fundData.fundComposition
				.filter((token) => token.isDeposit)
				.map((token) => token.tokenAddress);
			superDhedgePool.set('supportedDepositTokens', supportedDepositTokens);

			superDhedgePool.set('managerName', fundData.managerName);
			superDhedgePool.set('name', fundData.name);
			superDhedgePool.set('adjustedTokenPrice', fundData.adjustedTokenPrice);
			superDhedgePool.set('tokenPrice', fundData.tokenPrice);
			superDhedgePool.set('fundId', fundData.id);
			superDhedgePool.set('totalValue', fundData.totalValue);
			superDhedgePool.set('poolDetails', fundData.poolDetails);
			superDhedgePool.set('riskFactor', fundData.riskFactor);
			superDhedgePool.set('performanceFactor', fundData.performanceFactor);
			superDhedgePool.set('performanceMetrics', fundData.performanceMetrics);
			superDhedgePool.set('leaderboardRank', fundData.leaderboardRank);
			superDhedgePool.set('isPrivate', fundData.isPrivate);

			await superDhedgePool.save().then((object) => {
				logger.info('Fund Updated with objectId: ' + object.id);
			});
		}
	} catch (e) {
		logger.error(e);
	}

	request.message('Sync Dhedge Funds Completed');
};
