let numArrow;
let numField;
let arrowLengthMax;
let spaceLength;
let arrowLength;
let y0;
let x0;
let time;
let deltaT;
let omega;
let waveNum;
let speed;
let wireWidth;
let fieldPower;
let travelingWave;
let NUM;
let count;
let pg;

function wire(xpos, wid){
  rectMode(CENTER);
  noStroke();
  fill(255,215,0);
  rect(xpos,0, wid, height);
}

function arrow(xpos, ypos, len){
  stroke(0,0,205);
  strokeWeight(abs(len)/10);
  line(xpos, ypos - len/2, xpos, ypos + len/2);
  let kiri = createVector(len*cos(-1/4*PI)/5, len*sin(-1/4*PI)/5);
  let kanan = createVector(len*cos(3/4*PI)/5, -len*sin(3/4*PI)/5);
  line(xpos, ypos + len/2, xpos+kiri.x, ypos + len/2 + kiri.y);
  line(xpos, ypos + len/2, xpos+kanan.x, ypos + len/2 + kanan.y);
}

function EMfield(xpos, ypos, power){
  noStroke();
  fill(255,99,71);
  if (power >=0){
    circle(xpos, ypos, power*0.9);
  } else{
    let len = abs(power)/2;
    let wid = len/8;
    let v = [];
    v[0] = [wid, len];
    v[1] = [wid, wid];
    v[2] = [len, wid];
    v[3] = [len, -wid];
    v[4] = [wid, -wid];
    v[5] = [wid, -len];
    v[6] = [-wid, -len];
    v[7] = [-wid, -wid];
    v[8] = [-len, -wid];
    v[9] = [-len, wid];
    v[10] = [-wid, wid];
    v[11] = [-wid, len];
    for (let i = 0; i < v.length; i++){
      v[i] = [v[i][0]*cos(PI/4)-v[i][1]*sin(PI/4), v[i][0]*sin(PI/4)+v[i][1]*cos(PI/4)];
    }
    beginShape();
    for (let vx of v){
      vertex(xpos + vx[0], ypos+vx[1]);
    }
    endShape();
  }
}

function setup() {
  createCanvas(800, 800);
  pg = createGraphics(800, 800);
  frameRate(60);
  wireWidth = 20;
  numArrow = 20;
  numField = 15;
  arrowLengthMax = height*0.95/numArrow;
  spaceLength = height*0.05/(numArrow+1);
  arrowLength = arrowLengthMax*0.9;
  y0  = -height/2 + spaceLength + arrowLengthMax/2;
  xSpace = (width-wireWidth)/2/(numField+1);
  x0 = wireWidth/2 + xSpace;
  fieldPower = xSpace*0.9;
  time = 0;
  deltaT = 0.01;
  omega = TWO_PI/5;
  waveNum = TWO_PI/200;
  speed = omega/waveNum;
  travelingWave = 0;
  NUM =0;
  count = 0;
}

function draw() {
  translate(width/2, height/2);
  background(22);
  wire(0, wireWidth);
  power = sin(omega*time)*arrowLength;
  NUM = int((travelingWave+wireWidth/2)/xSpace);
  for (let i = 0; i < numArrow; i++){
    arrow(0, y0 + i*(arrowLengthMax+spaceLength), power);
    for (let j = 0; j <= NUM; j++){
      EMfield(x0 + j*xSpace, y0 + i*(arrowLengthMax+spaceLength), fieldPower*cos((x0 + j*xSpace)*waveNum - omega*time))
      EMfield(-x0 - j*xSpace, y0 + i*(arrowLengthMax+spaceLength), fieldPower*cos((x0 + j*xSpace)*waveNum - omega*time))
    }
  }
  time += deltaT;
  if (travelingWave < width/2 - wireWidth/2){
    travelingWave += speed*deltaT;
  }
  // if (count%200 == 0 & count <= 1000){
  //   image(pg, 0, 0, width, height);
  //   fileName = "gambar"+str(count/200)+".png";
  //   pg.save(fileName);
  // }
  count++;
}

function mousePressed(){
 pg.save("pg.png"); 
}