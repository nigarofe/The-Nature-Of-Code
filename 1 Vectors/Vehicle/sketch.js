let v;

function setup() {
    createCanvas(1280, 720);
    v = new Vehicle();
}

function draw() {
    background(0);
    v.update();
    v.render();

    if (keyIsDown(UP_ARROW)) {
        v.acceleration.y -= 0.01;
    } else if (keyIsDown(DOWN_ARROW)) {
        v.acceleration.y += 0.01;
    } else {
        v.acceleration.y = 0;
    }

    if (keyIsDown(RIGHT_ARROW)) {
        v.acceleration.x += 0.01;
    } else if (keyIsDown(LEFT_ARROW)) {
        v.acceleration.x -= 0.01;
    } else {
        v.acceleration.x = 0;
    }
}