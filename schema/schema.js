var  graphql  = require('graphql')
const CoinGecko = require('coingecko-api')

// Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

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
                const { data } = await CoinGeckoClient.coins.list();
                return data;
            }
        },
        getCoin: {
            type: CoinType,
            args: { id: { type: GraphQLID }},
            async resolve(parent, args) {
                const { data } = await CoinGeckoClient.coins.list();
                return data.find(coin => coin.id === args.id);
            }
        },
    }

})

module.exports = new GraphQLSchema({
    query: Query
})
