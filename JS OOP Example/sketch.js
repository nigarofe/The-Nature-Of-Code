let bug; // Declare object

function setup() {
    createCanvas(720, 720);
    bug = new Jitter();
}

function draw() {
    background(50, 89, 100);
    bug.move();
    bug.display();
}