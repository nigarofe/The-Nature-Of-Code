let position;
let velocity;

function setup() {
    createCanvas(1280, 720);
    position = createVector(width / 2, height / 2);
    velocity = createVector(1, 3);
}

function draw() {
    background(0);

    ellipse(position.x, position.y, 21, 21);

    position.add(velocity);

    if (position.x < 0 || position.x > width) {
        velocity.x *= -1;
    }
    if (position.y < 0 || position.y > height) {
        velocity.y *= -1;
    }
}