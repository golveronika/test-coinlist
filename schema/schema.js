const graphql  = require('graphql')
const fetch = require('node-fetch')
// const CoinGecko = require('coingecko-api')

// Initiate the CoinGecko API Client
// const CoinGeckoClient = new CoinGecko();

const  { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList } = graphql;


const CoinType = new GraphQLObjectType({
    name: 'Coin',
    fields: () => ({
        id: { type: GraphQLString },
        symbol: { type: GraphQLString },
        name: { type: GraphQLString },        
    })
})

const Query = new GraphQLObjectType ({
    name: 'Query',
    fields: {
        getCoins: {
            type: new GraphQLList(CoinType),
            async resolve(parent, args) {
                // const { data } = await CoinGeckoClient.coins.list()
                // return data
                const response = await fetch('https://api.coingecko.com/api/v3/coins/list')
                return response.json()
            }
        },
        getCoin: {
            type: CoinType,
            args: { id: { type: GraphQLID }},
            async resolve(parent, args) {
                const response = await fetch(`https://api.coingecko.com/api/v3/coins/${args.id}`)
                return response.json()
            }
        },
    }

})

module.exports = new GraphQLSchema({
    query: Query
})
