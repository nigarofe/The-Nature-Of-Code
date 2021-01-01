let balls;

function setup() {
    createCanvas(1280, 720);

    balls = new Array();
    for (let i = 0; i < 20; i++) {
        balls.push(new Ball());
    }
}

function draw() {
    background(0);

    for (let i = 0; i < balls.length; i++) {
        balls[i].render();
        balls[i].collide();

        for (let j = i + 1; j < balls.length; j++) {
            balls[i].collideWithBall(balls[j]);
        }
    }
}