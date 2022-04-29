import { useMoralis } from 'react-moralis';

// format a dhedge performance metric
// example performanceFactor = "1000000000000000000"
// example metric = "1042544686770233707"
// example result = "4.3%"
const useDhedgePerformanceMetric = (
	metric = '1000000000000000000',
	performanceFactor = '1000000000000000000'
) => {
	console.log(metric, performanceFactor);
	const { Moralis } = useMoralis();
	const shortMetric = Moralis.Units.FromWei(metric, 14);
	const shortPerformanceFactor = Moralis.Units.FromWei(performanceFactor, 14);
	console.log(
		shortMetric,
		shortPerformanceFactor,
		shortMetric - shortPerformanceFactor
	);

	return (
		(
			((+shortMetric - shortPerformanceFactor) / shortPerformanceFactor) *
			100
		).toFixed(1) + '%'
	);
};

export default useDhedgePerformanceMetric;
