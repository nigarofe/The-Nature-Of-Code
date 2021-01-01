let centerDot;

function setup() {
    createCanvas(1280, 720);
    centerDot = createVector(width / 2, height / 2);
}

function draw() {
    // line(centerDot.x, centerDot.y, mouseX, mouseY);


    background(255);
    mousePosition = createVector(mouseX, mouseY);
    line(centerDot.x, centerDot.y, mousePosition.x, mousePosition.y);

    fill(0);
    let distance = mousePosition.sub(centerDot);
    distance = distance.mag();
    rect(0, 0, distance, 10)
}