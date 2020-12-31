function setup() {
    createCanvas(1280, 720);
    background(0);
}

function draw() {
    let mean = width / 2;
    let standardDeviation = 300;

    let n = randomGaussian(mean, standardDeviation);

    fill(255, 10);
    noStroke();
    ellipse(n, height / 2, 21, 21);
}