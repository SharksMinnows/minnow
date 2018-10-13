//Game logic here!  should be wrapped and only triggered once lobby is full and ready to play
let user;
let img;

/*
GAMESTATUS OPTIONS
1: lobby
2: countdown
3: alive
4: dead
5: safe

*/

let gameStatus = 'alive';  // Temporary variable - gameStatus should be coming from socket constantly

const socket = io.connect('192.168.0.198:3333');
// const socket = io.connect('http://localhost:3333');

let socket_id, userColor;
socket.on('setID', newID => socket_id = newID);
socket.on('setColor', color => userColor = color);

let allPlayers = {};

class Player {
  constructor(x, y, socket_id) {
    this.type = 'minnow';
    this.speed = 10;
    this.r = 20;
    this.color = 'red';
    this.id = socket_id; // Should represent socket connection ID so socket can identify players
    this.status = 'alive'; // Values should be alive, dead, safe?
    this.pos = createVector(x, y);
    console.log('pos => ', this.pos, x, y);        
  }

  move() {
      const vel = createVector(mouseX - width / 2, mouseY - height / 2);
      vel.setMag(this.speed);
      this.pos.add(vel);
      let dataForSocket = {x: this.pos.x, y: this.pos.y, id: this.id, type: this.type};
      socket.emit('update', dataForSocket);
  }

  // Sets bounds player can move - this might need to move out of player and into something related to the board
  constrain() {
    this.pos.x = constrain(user.pos.x, 0 - this.r, 6000 - this.r);
    this.pos.y = constrain(user.pos.y, 0 + this.r, 6000 - this.r);
  }

  show() {
      fill(this.color);
      ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
  }
}

class Shark extends Player {
  constructor(x, y) {
    super(x, y)
    this.speed = 5;
    this.r = 60;
  }
}

class Minnow extends Player {
  constructor(x, y) {
    super(x, y)
    this.speed = 10;
    this.r = 20;
  }
}

// P5 preload function is used for gathering boarc bg image
function preload() {
  img = loadImage('img/tank5.jpg');
}

// Create board
function setup() {
  createCanvas(windowWidth, windowHeight);
  user = new Player(2500, 4900, socket_id);

  for (let keys in allPlayers) {
    allPlayers[keys].type = ellipse(allPlayers[keys].x, allPlayers[keys].y, 20*2, 20*2)
  }
}

// P5 function that is constantly called - should spread out
function draw() {
  background('#ececec');
  translate((width / 2) - user.pos.x, (height / 2) - user.pos.y)
  

  if (gameStatus === 'alive') {
    user.move();
  }

  // Visual Game Boarder
  fill('rgba(0,255,55, 0.25)');
  image(img, 0, 0, 6000, 6000);
  
  // Display main user
  user.show();

  
  // Display other users
  for (let keys in allPlayers) {
    // Handle test here to determine if other players are above screen by some size 
    allPlayers[keys].type = ellipse(allPlayers[keys].x, allPlayers[keys].y, 20*2, 20*2)
  }
  
  if (user.pos.x < - user.r * 2) {
    gameStatus = 'dead'; // SAFE ZONE!!!! NO more moving
  } else {
    user.constrain(); // Not in safe zone - keep setting constraints 
  }
}



socket.on('setType', type => {
  user.type = 'shark';
  user.speed = 7;
  user.r = 60;
  user.color = 'red';
})

socket.on('update', data => {
  delete data[user.id];
  allPlayers = data;

  if (user.type === 'shark') {
    console.log('im a shark');
    for (let key in allPlayers) {
      if (allPlayers[key].type === 'minnow') {
        const distance = dist(user.pos.x, user.pos.y, allPlayers[key].x, allPlayers[key].y);
         console.log('distance => ', distance);
         if (distance <= 100) {
          socket.emit('eaten', allPlayers[key].id);
        }
      }
    }
  }
})