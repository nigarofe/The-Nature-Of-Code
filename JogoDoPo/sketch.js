// Optimizations:
// Matrix? -> it seens good
// Group particles by distance?
// Distance between particles?
// Disable particles that aren't in contact with air?
//Optimise your code: load code at the right time


let p;
let brushSize = 2;

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(30);
    p = new Population();

}

function draw() {;
    background(0);
    fill(255);
    textSize(30);
    text(Math.round(frameRate()), 20, 50);

    p.render();
}

function mouseDragged() {
    p.addEntity(mouseX, mouseY, brushSize);
    console.log(p.entities.length)
}