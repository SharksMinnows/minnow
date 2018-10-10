//Game logic here!  should be wrapped and only triggered once lobby is full and ready to play
let user;

class Player {
  constructor() {
    this.type = 'Shark';
    this.id = null;
    this.status = null;
    this.pos = createVector(width/2, height/2);
    
  }

  move(speed) {
    const vel = createVector(mouseX - width / 2, mouseY - height / 2);
    vel.setMag(speed);
    this.pos.add(vel);
  }

  constrain() {
    this.pos.x = constrain(user.pos.x, 0 - this.r, 6000 - this.r);
    this.pos.y = constrain(user.pos.y, 0 + this.r, 6000 - this.r);
  }

  show() {
    // fill(255);
    ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2)
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
  constructor() {
    super()
    this.r = 20
    this.speed = 100
  }

}

class Watcher extends Player {
  constructor() {
    super()
  }
}

//create board
function setup() {
  createCanvas(windowWidth, windowHeight);
  user = new Minnow()
}

function draw() {
  background('blue');
  translate((width / 2) - user.pos.x, (height / 2) - user.pos.y)
  user.show();
  user.move(user.speed);
  user.constrain();
  rect(0, 0, 6000, 6000);
  fill('rgba(0,255,0, 0.25)');

  if (user.pos.x < 0 - user.r * 2) {
    noLoop()
  }

}