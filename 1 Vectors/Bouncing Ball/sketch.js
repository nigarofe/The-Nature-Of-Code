let x;
let y;
let xSpeed;
let ySpeed;

function setup() {
    createCanvas(1280, 720);
    x = width / 2;
    y = height / 2;
    xSpeed = 1;
    ySpeed = 3;
}

function draw() {
    background(0);

    ellipse(x, y, 21, 21);

    x += xSpeed;
    y += ySpeed;

    if (x < 0 || x > width) {
        xSpeed *= -1;
    }
    if (y < 0 || y > height) {
        ySpeed *= -1;
    }
}