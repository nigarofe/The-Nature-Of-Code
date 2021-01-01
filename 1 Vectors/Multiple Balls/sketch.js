let balls;

function setup() {
    createCanvas(1280, 720);

    balls = new Array();
    for (let i = 0; i < 100; i++) {
        balls.push(new Ball());
    }
}

function draw() {
    background(0);

    for (let i = 0; i < balls.length; i++) {
        balls[i].render();
    }
}