require('dotenv/config')

const randomPastel = require('./randomPastel.js');

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
let connections = {};
//create grid

let grid = {};
//create rows, for each row create columns
//assume the board is 6000 - 0
for(let i = -1000; i <= 6500; i += 500){
    grid[i] = {}
    for(let j = -1000; j <= 6500; j += 500){
        grid[i][j] = [];
    }
}

const ground = num => Math.floor(num/100)*100;

const server = app.listen(3333, () => {
    console.log(`Listening on 3333`)

});

const io = socket(server);

app.use('/auth', authRoutes)

app.use(express.static(path.join(__dirname, '../build')))

io.on('connection', (socket) => {
    connections[socket.id] = socket;
    console.log('Somebody connected to the socket!', socket.id);
    socket.emit('setID', socket.id);
    socket.emit('setColor', randomPastel())
    socket.on('update', data => {        
        console.clear();    
        
        allPlayers[data.id] = data;
        
        console.log(allPlayers, Object.keys(connections).length); //fix extra boys problem with disconnect

        if(data.id === null){
            socket.emit('setID', ++currentGlobalIncrementingID);
        }
        socket.emit('update', allPlayers);
    })
    socket.on('eaten', id => {
        allPlayers[id].emit('setType', 'Shark')
        
    })
})






//I made this at 2 AM, then looked at it, thought for a second about what the consequences of my actions, then rewrote it.

// gridSquare =       grid[ground(data.x)][ground(data.y)]
// gridSquare.push(data.id); if(gridSquare.length > 1) collideables.push(gridSquare)
// gridSquare =       grid[ground(data.x)][ground(data.y - 100)]
// gridSquare.push(data.id); if(gridSquare.length > 1) collideables.push(gridSquare)
// gridSquare =       grid[ground(data.x)][ground(data.y + 100)]
// gridSquare.push(data.id); if(gridSquare.length > 1) collideables.push(gridSquare)
// gridSquare = grid[ground(data.x + 100)][ground(data.y)]
// gridSquare.push(data.id); if(gridSquare.length > 1) collideables.push(gridSquare)
// gridSquare = grid[ground(data.x + 100)][ground(data.y - 100)]
// gridSquare.push(data.id); if(gridSquare.length > 1) collideables.push(gridSquare)
// gridSquare = grid[ground(data.x + 100)][ground(data.y + 100)]
// gridSquare.push(data.id); if(gridSquare.length > 1) collideables.push(gridSquare)
// gridSquare = grid[ground(data.x - 100)][ground(data.y)]
// gridSquare.push(data.id); if(gridSquare.length > 1) collideables.push(gridSquare)
// gridSquare = grid[ground(data.x - 100)][ground(data.y - 100)]
// gridSquare.push(data.id); if(gridSquare.length > 1) collideables.push(gridSquare)
// gridSquare = grid[ground(data.x - 100)][ground(data.y + 100)]
// gridSquare.push(data.id); if(gridSquare.length > 1) collideables.push(gridSquare)

//Decided to keep it in the comments. Look upon it as a reminder that things can always get worse.