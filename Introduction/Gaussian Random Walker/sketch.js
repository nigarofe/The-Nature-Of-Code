let w;

function setup() {
    createCanvas(1280, 720);
    background(0);

    w = new Walker();
}

function draw() {
    w.show();
    w.move();
}