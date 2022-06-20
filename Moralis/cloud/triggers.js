// lower case every address field or nested value
Moralis.Cloud.beforeSave('DhedgeAsset', function (request) {
	const { object } = request;
	const address = object.get('address');
	const superTokens = object.get('superTokens');

	object.set('address', address.toLowerCase());
	if (superTokens) {
		for (let i = 0; i < superTokens.length; i++) {
			superTokens[i] = superTokens[i].toLowerCase();
		}
		object.set('superTokens', superTokens);
	}
});

// lower case every address field or nested value in SuperDhedgePool
Moralis.Cloud.beforeSave('SuperDhedgePool', function (request) {
	const { object } = request;

	object.set(
		'dhedgeFundAddress',
		object.get('dhedgeFundAddress').toLowerCase()
	);
	object.set('superPoolAddress', object.get('superPoolAddress').toLowerCase());
	object.set('poolSuperToken', object.get('poolSuperToken').toLowerCase());
	object.set(
		'supportedDepositTokens',
		object.get('supportedDepositTokens').map((token) => token.toLowerCase())
	);

	const supportedSuperTokens = object.get('supportedSuperTokens');
	const supportedSuperTokensLower = {};
	if (supportedSuperTokens) {
		for (let key in supportedSuperTokens) {
			supportedSuperTokensLower[key.toLowerCase()] =
				supportedSuperTokens[key].toLowerCase();
		}
		object.set('supportedSuperTokens', supportedSuperTokensLower);
	}
});

Moralis.Cloud.afterSave('SuperDhedgeTokenDeposited', async function (request) {
	const { object } = request;
	const poolAddress = object.get('address');

	const SuperDhedgePool = Moralis.Object.extend('SuperDhedgePool');
	const query = new Moralis.Query(SuperDhedgePool);
	query.equalTo('superPoolAddress', poolAddress);
	const superDhedgePool = await query.first();

	if (superDhedgePool) {
		superDhedgePool.set('lastDeposit', object.get('block_timestamp'));
		await superDhedgePool.save(null, { useMasterKey: true });
	}
});
