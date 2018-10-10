require('dotenv/config')
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql-schema');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, './public')))

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: false //Set to true to view GraphiQl in browser at /graphql
}));

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
});