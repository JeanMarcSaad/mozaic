let p5;
let radius = 0;
let speed = 5;
let drawPercentage = 20;
let circleRow = 80;
let stack = false;
let redColorFactor, blueColorFactor, greenColorFactor;
let circleArray = []
let mozaicWidth = 1080;
let mozaicHeight = 720;

export function main(p5_) {
  p5 = p5_


  p5.setup = () => {
    p5.createCanvas(mozaicWidth, mozaicHeight);
    p5.background(0);
    p5.frameRate(24);
    drawCircles(true);
  }

  p5.draw = () => {
    radius = mozaicWidth / circleRow;
    updateCircles();
  }
}

export function saveCanvasAsPng() {
  p5.saveCanvas('mozaic', 'png');
}

export function saveCanvasAsGif() {
  p5.createLoop({duration:3, gif:true})
}

export function setCircleRow(val) {
  circleRow = val;
}

export function setDrawPercentage(val) {
  drawPercentage = val;
}

export function setSpeed(val) {
  speed = val;
  drawCircles(false);
}

export function setRedFactor(val) {
  redColorFactor = val;
}

export function setBlueFactor(val) {
  blueColorFactor = val;
}

export function setGreenFactor(val) {
  greenColorFactor = val;
}

export function drawCircles(randomize) {
  if(!stack)
    p5.background(0, 255);
  if(randomize) {
    redColorFactor = p5.random(40,255);
    blueColorFactor = p5.random(40,255);
    greenColorFactor = p5.random(40,255);
  }
  circleArray = []
  radius = mozaicWidth / circleRow;
  for(var i =0; i < mozaicHeight + radius; i += radius){
    for(var j = 0; j < mozaicWidth + radius; j+= radius){
      var rand = p5.random(0, 100);
      if (rand > drawPercentage) {
        circleArray.push(new Circle(j, i, radius, speed));
      }
    }
  }
}

function updateCircles() {
  for(var i=0; i < circleArray.length; i++) {
    if(p5.random(0, 100) < 30)
      circleArray[i].update();
  }
}

export function updateCircleSpeed() {
  p5.background(0);
  for(var i=0; i < circleArray.length; i++) {
    circleArray[i].updateSpeed(speed);
  }
}

class Circle {
  constructor(x, y, r, s) {
    this.x = x;
    this.y = y;
    this.radius = r;
    this.currRadius = radius-(radius*0.5);
    this.speed = s;
    this.colorFactor = p5.random(0, 80);
    if(parseInt(this.colorFactor) % 2 != 0){
      this.speed *= -1;
    }

    p5.fill(redColorFactor - this.colorFactor, greenColorFactor - this.colorFactor, blueColorFactor - this.colorFactor, 255);
    p5.ellipse(this.x, this.y, this.currRadius, this.currRadius);
  }

  updateSpeed(s) {
    this.speed = 0;
    this.speed = s;
    if(parseInt(this.colorFactor) % 2 != 0){
      this.speed *= -1;
    }
  }

  update() {
    p5.fill(redColorFactor - this.colorFactor, greenColorFactor - this.colorFactor, blueColorFactor - this.colorFactor, 255);
    p5.ellipse(this.x, this.y, this.currRadius, this.currRadius);
    this.currRadius += this.speed/4;
    if(this.currRadius <= radius-(radius*0.8) || this.currRadius >= radius-(radius*0.2)) {
      this.speed *= -1;
    }
  }
}
