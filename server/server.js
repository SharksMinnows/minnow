const trace_events = require('trace_events');
const tracing = trace_events.createTracing({ categories: ['node.perf'] });

require('dotenv/config')
const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
// const schema = require('./graphql-schema');
const path = require('path')
const authRoutes = require('./routes/auth-routes.js');
// const passportSetup = require('./passport-config.js')
const PORT = 3333;
const socket = require('socket.io')

let currentGlobalIncrementingID = 0;

let allPlayers = {};

const server = app.listen(3333, () => {
    console.log(`Listening on 3333`)
});

const io = socket(server);

app.use('/auth', authRoutes)

app.use(express.static(path.join(__dirname, '../build')))

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

tracing.enable();
