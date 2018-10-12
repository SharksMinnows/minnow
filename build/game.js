//Game logic here!  should be wrapped and only triggered once lobby is full and ready to play
let user;
let img;
let gameStatus = 'waiting';  // Temporary variable - gameStatus should be coming from socket constantly

const socket = io.connect('192.168.0.198:3333');

let allPlayers = {};

socket.on('update', data => {
  delete data[user.id];
  allPlayers = data;
})


class Player {
  constructor(x, y) {
    this.type = 'minnow';
    this.id = null; // Should represent socket connection ID so socket can identify players
    this.status = 'alive'; // Values should be alive, dead, safe?
    this.pos = createVector(x, y);    
    socket.on('setID', newID => this.id = newID);
  }

  move() {
    if (this.status === 'alive') {
      const vel = createVector(mouseX - width / 2, mouseY - height / 2);
      vel.setMag(this.speed);
      this.pos.add(vel);
      let dataForSocket = {x: this.pos.x, y: this.pos.y, id: this.id, type: this.type};
      socket.emit('update', dataForSocket);
    }
  }

  // Sets bounds player can move - this might need to move out of player and into something related to the board
  constrain() {
    this.pos.x = constrain(user.pos.x, 0 - this.r, 6000 - this.r);
    this.pos.y = constrain(user.pos.y, 0 + this.r, 6000 - this.r);
  }

  show() {
    if (this.type === 'shark') {
      fill('red');
      ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2)
    } else { 
      fill('orange');
      ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2)
    }
  }
}

class Shark extends Player {
  constructor() {
    super()
    this.speed = 5;
    this.r = 60;
    this.closeMinnows = {};
  }

}

class Minnow extends Player {
  constructor(x, y) {
    super(x, y)
    this.r = 20
    this.speed = 20
  }

}

// P5 preload function is used for gathering boarc bg image
function preload() {
  img = loadImage('img/tank5.jpg');
}

// Create board
function setup() {
  createCanvas(windowWidth, windowHeight);
  user = new Minnow(100, 200);

  for (let keys in allPlayers) {
    allPlayers[keys].type = ellipse(allPlayers[keys].x, allPlayers[keys].y, 20*2, 20*2)
  }

  // Temp function to wait for game to start
  setTimeout(() => {
    gameStatus = 'started';
  }, 3000)
}

// P5 function that is constantly called - should spread out
function draw() {
  background('#ececec');
  translate((width / 2) - user.pos.x, (height / 2) - user.pos.y)
  

  if (gameStatus === 'started') {
    user.move();
  }
  console.log('IdDD =>', user.id)
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
  
  if (user.pos.x < 10 - user.r * 2) {
    noLoop(); // SAFE ZONE!!!! NO more moving
  } else {
    user.constrain(); // Not in safe zone - keep setting constraints 
  }

}