const assetsQuery = {
	query: `{
                assets {
                    blockchainCode
                    address
                    id
                    name
                    type
                    precision
                    rate
                    description
                }
            }`,
	variables: `{}`,
};

const getFundQuery = (variables) => ({
	query: `
    Fund($address: String!) {
        fund(address: $address) {
            managerName
            name
            address
            adjustedPerformance
            adjustedTokenPrice
            tokenPrice
            id
            isPrivate
            leaderboardRank
            performance
            performanceFactor
            performanceMetrics {
            day
            halfyear
            month
            quarter
            week
            year
            }
            poolDetails
            riskFactor
            totalValue
            fundComposition {
            id
            isDeposit
            rate
            tokenAddress
            tokenName
            }
        }
    }`,
	variables,
});
