const express = require('express')
const graphqlHTTP = require('express-graphql')

const app = express();

const schema = require('../schema/schema')

const PORT = process.env.PORT || 5003;

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(PORT, err => {
  err ? console.log(err) :  console.log(`Server is up on port ${PORT}\n${(PORT === 5003) ? 'http://localhost:5003/graphql': ''}`)
});
