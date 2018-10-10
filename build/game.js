//Game logic here!  should be wrapped and only triggered once lobby is full and ready to play
let user;

class Player {
  constructor() {
    this.type = 'Shark';
    this.status = null;
    this.pos = createVector(width/2, height/2);
    
  }

  move(speed) {
    const vel = createVector(mouseX, mouseY);
    vel.sub(this.pos);
    vel.setMag(speed);
    this.pos.add(vel);
  }

  show() {
    fill(255);
    // ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2)
    arc(this.pos.x, this.pos.y, 80, 80, 0, PI + QUARTER_PI, PIE);
  }
}

class Shark extends Player {
  constructor() {
    super()
    this.speed = 5;
    this.r = 64;
    this.closeMinnows = {};
  }

}

class Minnow extends Player {
  constructor() {
    super()
    this.speed = 10
  }

}

//create board
function setup() {
  createCanvas(windowWidth, windowHeight);
  user = new Shark()
}

function draw() {
  background('blue');

  user.show()
  user.move(user.speed);
}