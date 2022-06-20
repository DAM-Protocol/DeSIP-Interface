const getWatchEventOptions = (eventName, address, options = {}) => {
	const defaultOptions = {
		chainId: '0x89',
		limit: 500000,
		sync_historical: false,
	};
	switch (eventName) {
		case 'TokenDeposited':
			return {
				...defaultOptions,
				...options,
				address: address,
				topic: 'TokenDeposited(address, uint256, uint256)',
				abi: {
					anonymous: false,
					inputs: [
						{
							indexed: false,
							internalType: 'address',
							name: 'token',
							type: 'address',
						},
						{
							indexed: false,
							internalType: 'uint256',
							name: 'amount',
							type: 'uint256',
						},
						{
							indexed: false,
							internalType: 'uint256',
							name: 'liquidityMinted',
							type: 'uint256',
						},
					],
					name: 'TokenDeposited',
					type: 'event',
				},
				tableName: 'SuperDhedgeTokenDeposited',
			};
	}
};
