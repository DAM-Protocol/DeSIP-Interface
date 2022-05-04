import { Stack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import Page from '../../components/layouts/Page';
import PoolDetails from '../../components/DHedge/PoolDetails';
import { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../../context/Web3Context';
import { useMoralis, useMoralisQuery } from 'react-moralis';
import UserPoolData from '../../components/DHedge/UserPoolData';

const SuperPool = () => {
	const { pools } = useContext(Web3Context);
	const { poolAddress } = useParams();
	const { isWeb3Enabled } = useMoralis();

	const { superfluidProvider, initialiseSf } = useContext(Web3Context);
	useEffect(() => {
		if (!superfluidProvider && isWeb3Enabled) initialiseSf();
	}, [isWeb3Enabled, initialiseSf, superfluidProvider]);

	const {
		fetch: getDhedgePool,
		data: superDhedgePool,
		error: superDhedgePoolError,
		isLoading: isLoadingSuperDhedgePool,
	} = useMoralisQuery(
		'SuperDhedgePool',
		(query) => query.equalTo('superPoolAddress', poolAddress).limit(1),
		[poolAddress],
		{
			autoFetch: false,
		}
	);
	const [poolData, setPoolData] = useState({});

	useEffect(() => {
		const pool = pools?.find((p) => p.get('superPoolAddress') === poolAddress);
		if (pool) {
			setPoolData(pool.attributes);
		} else {
			getDhedgePool().then((res) => {
				setPoolData(res?.[0]?.attributes);
			});
		}
	}, [getDhedgePool, poolAddress, pools]);

	return (
		<Page bg>
			<Stack
				direction={{ xl: 'column', base: 'row' }}
				wrap='wrap'
				spacing='0'
				justify={{ xl: 'start', base: 'center' }}
				maxH={{ base: 'none', xl: 'xl' }}
			>
				<PoolDetails poolData={poolData} />

				<UserPoolData poolData={poolData} />
			</Stack>
		</Page>
	);
};

export default SuperPool;
