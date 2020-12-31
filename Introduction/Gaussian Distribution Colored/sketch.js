function setup() {
    createCanvas(1280, 720);
    background(0);
}

function draw() {
    let mean = width / 2;
    let standardDeviation = 200;

    let n = randomGaussian(mean, standardDeviation);
    let color = [randomGaussian(127, 127), randomGaussian(127, 127), randomGaussian(127, 127), 100];

    fill(color);
    noStroke();
    ellipse(n, height / 2, 21, 21);
}