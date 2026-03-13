// Midterm first draft 
// my word is fading - i wanted to create someting that felt like the fading of emotion, something strong slowly dying out.

let burn = 1;
let smokeParticles = [];



function setup() {
 // put setup code here
 createCanvas(800,800);
 noStroke();
}

function draw() {
  
 background (0);
  
  burn -= 0.001;       // this will allow the flame to slowly decrease =
  burn = max(burn,0);  //max chooses the largest value so it doesnt go negative
  
 drawCandle();
 drawFlame(width/2, height/2-20,burn);
 drawBase();
 
 if (burn < 0.25) {
  createSmoke(width/2, height/2-140);
  }
  
 updateSmoke();
 drawSmoke();
  
}

function drawCandle() {

  push(); // push pop act like a container for the draw style changes - like fill or scale
  
    translate(width/2, height/2); //translate changes the origin from (0,0) to (x,y) -> doing width/2 height/2 places the object in the center of the acreen and allows for the drawing to asapt even if the screen size changes. 

    fill(255,255,255);
    rect(-40,-120,80,240,20);

    fill(240,230,250);
    ellipse(0,-110,80,25);

    fill(100,0,0);
    rect(-3,-130,5,20,2);

    pop();

}

function drawBase() {
  
    push(); 
  
    translate(width/2, height/2 +210); 

    
    fill(192,192,192);
    ellipse(0,-100,90,25);
  
    rect(-5,-100,10,250,5);
    rect(-3,-125,8,25,2);
    rect(-40,-125,8,25,2);
    rect(35,-125,8,25,2);
  
    ellipse(0,150,90,25);


    pop();
  
}

function drawFlame(x,y,burnValue) {
  
  push();
    translate(x,y); 
   
    let size = map(burnValue,0,1,0,40); //map allows the decrease in burn to control the size of the flame layers, the original flame 10,40 is altered locally for each ellipse to allow the gradual change
    let alpha = map(burnValue, 0, 1, 0, 255); // alpha is the opacity - this allows for the opacity to react to the burn time so it gradually decreases in opacity and size
    
    if (size <= 0) { // when burn = 0 the flame will die out
    pop();
    return;
  } 
  
    let fx = random(-0.5,2); //creates movement in the flame vertically
    let fy = random(-2,0.5); //creates movement in the flame horizontally
    translate(fx,fy); // I want advice on how to make the flicker smoother - on p5 i saw there is a nosie function used to create a more organic transition because it works with smaller values but I'm not sure how to integrate it

  
    fill(200,255,255,alpha);
    ellipse(0,-120,size * 0.4,size *0.8);

    fill(230,255,255,alpha * 0.01);
    ellipse(0,-125,size * 0.6,size * 1.1,7);
  
    fill(230,255,255,alpha * 0.5);
    ellipse(0,-125,size ,size * 1.5 ,9);
  
    fill(230,255,255,alpha * 0.2);
    ellipse(0,-130,size *2.5,size *2.5,5);

pop();

  
}

function createSmoke(x,y){
  
  if(frameCount % 4 == 0){
    smokeParticles.push(new Smoke(x,y)); //this gradually creates more smoke particles in the array after the flame goes out
  }
  
}

function updateSmoke() {
  
  for(let p of smokeParticles){
      p.update(); } //smokeParticles is an array, p represents one smoke this updates each of the smokes in the array
  
  
}

function drawSmoke() {
  for(let p of smokeParticles){
    p.display(); //draws the indivdual particles p in relation the display method
  }
  
  
}

//oop + methods!

class Smoke{
  
  constructor(x,y) {
    
    this.x = x;
    this.y = y;
    
    this.vx = random(-0.5,2) //setting up velocity control
    this.vy = random(-0.5,-2) //used the same values as flicker but made y both negative so they go up
    
    this.size = random(10,20); // controls the size of particles
    this.life = 255; //life which control the duration of the particles
    
  }
  
   update(){ //updates for the display to then be drawn

    this.x += this.vx;
    this.y += this.vy;

    this.life -= 2;
    this.size += 0.05; 

  }

   display(){ //display is what is drawn

    fill(180,160,170,this.life*0.3);
    ellipse(this.x,this.y,this.size*1.3,this.size); //life decreasing which controls opacity so the particles die out

  }
  
// I want to have the smoke particles follow the mouse! Hoping to work on this for the critique

  
}
