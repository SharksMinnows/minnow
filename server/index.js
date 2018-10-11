require('dotenv/config')
const graphqlHTTP = require('express-graphql');
// const schema = require('./graphql-schema');
const path = require('path');
const PORT = process.env.PORT || 3333;

const express = require('express');
const socket = require('socket.io')

let currentGlobalIncrementingID = 0;

let allPlayers = {};

const app = express();
const server = app.listen(3333, () => {
    console.log(`Listening on 3333`)
});

const io = socket(server);

io.on('connection', (socket) => {
    console.log('Somebody connected to the socket!', socket.id);
    socket.emit('setID', ++currentGlobalIncrementingID);
    socket.on('update', data => {
        console.clear()
        allPlayers[data.id] = data;
        console.log(allPlayers);

        if(data.id === null){
            socket.emit('setID', ++currentGlobalIncrementingID);
        }
        socket.emit('update', allPlayers);
    })
})

app.use(express.static(path.join(__dirname, '../build')))



// app.use('/graphql', graphqlHTTP({
//     schema,
//     graphiql: false //Set to true to view GraphiQl in browser at /graphql
// }));
