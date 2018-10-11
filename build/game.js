//Game logic here!  should be wrapped and only triggered once lobby is full and ready to play
let user;
let img;
let gameStatus = 'waiting';  // Temporary variable - gameStatus should be coming from socket constantly

let players = {
  1: {
    type: null,
    x: 10,
    y: 20,
  }, 
  2: {
    type: null,
    x: 30,
    y: 40,
  }, 
  3: {
    type: null,
    x: 100,
    y: 200,
  }, 
  4: {
    type: null,
    x: 200,
    y: 230,
  }, 
  5: {
    type: null,
    x: 423,
    y: 243,
  }, 
}

class Player {
  constructor(x, y) {
    this.type = 'minnow';
    this.id = null; // Should represent socket connection ID so socket can identify players
    this.status = 'alive'; // Values should be alive, dead, safe?
    this.pos = createVector(x, y);
  }

  move() {
    if (this.status === 'alive') {
      const vel = createVector(mouseX - width / 2, mouseY - height / 2);
      vel.setMag(this.speed);
      this.pos.add(vel);
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

// Was thinking people could be Watchers if the game is full - view would be of entire board - Stretch feature
class Watcher extends Player {
  constructor() {
    super()
  }
}

function preload() {
  img = loadImage('img/tank5.jpg');
}

//create board
function setup() {
  createCanvas(windowWidth, windowHeight);
  user = new Minnow(100, 200);

  for (let keys in players) {
    players[keys].type = new Minnow(players[keys].x, players[keys].y)
  }

  // Temp function to wait for game to start
  setTimeout(() => {
    gameStatus = 'started';
  }, 5000)
}

function draw() {
  background('#ececec');
  translate((width / 2) - user.pos.x, (height / 2) - user.pos.y)
  
  

  if (gameStatus === 'started') {
    user.move();
  }
  
  // Visual Game Boarder
  fill('rgba(0,255,55, 0.25)');
  // rect(0, 0, 6000, 6000);
  image(img, 0, 0, 6000, 6000);
  user.show();
  for (let keys in players) {
    players[keys].type.show()
  }
  
  if (user.pos.x < 10 - user.r * 2) {
    noLoop(); // SAFE ZONE!!!! NO more moving
  } else {
    user.constrain(); // Not in safe zone - keep setting constraints 
  }

}