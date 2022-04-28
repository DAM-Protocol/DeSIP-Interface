const assetsQuery = `{
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
}`;

const fundQuery = `
    query Fund($address: String!){
        fund(address: $address) {
            managerName
            name
            adjustedTokenPrice
            tokenPrice
            id
            isPrivate
            leaderboardRank
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
                tokenAddress
            }
        }
    }`;
