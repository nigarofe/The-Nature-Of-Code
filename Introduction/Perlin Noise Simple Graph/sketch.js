let time;

function setup() {
    createCanvas(1280, 720);
    time = 0;
    background(0);
}

function draw() {
    stroke(255);

    let x = time * 100;
    let y = map(noise(time), 0, 1, 0, height);
    point(x, y);
    time += 0.01;
}