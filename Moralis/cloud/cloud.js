Moralis.Cloud.job('syncDhedgeAssets', (request) => {
	// params: passed in the job call
	// headers: from the request that triggered the job
	// log: the Moralis Server logger passed in the request
	// message: a function to update the status message of the job object
	const { params, headers, log, message } = request;
	message('MESSAGE - Syncing dHEDGE Assets');
	log.info('LOG - Syncing dHEDGE Assets');
	return syncDhedgeAssets(request);
});

Moralis.Cloud.job('exampleJob', (request) => {
	// params: passed in the job call
	// headers: from the request that triggered the job
	// log: the Moralis Server logger passed in the request
	// message: a function to update the status message of the job object
	const { params, headers, log, message } = request;
	message('Running example job');
	log.info('Running example job - 2');
	return function (request) {
		request.log.info('example job function');
		return {
			message: 'example job ran',
		};
	};
});
