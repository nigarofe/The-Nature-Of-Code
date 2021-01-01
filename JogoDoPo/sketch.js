let p;

function setup() {
    createCanvas(windowWidth, windowHeight);
    p = new Population();
}

function draw() {
    background(0);
    p.render();
}

function mouseDragged() {
    p.addEntity(mouseX, mouseY);
}