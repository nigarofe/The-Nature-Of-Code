function setup() {
    createCanvas(1280, 720);
    background(0);
}

function draw() {
    let mean1 = width / 2;
    let standardDeviation1 = 200;
    let x = randomGaussian(mean1, standardDeviation1);

    let mean2 = height / 2;
    let standardDeviation2 = 100;
    let y = randomGaussian(mean2, standardDeviation2);

    let color = [randomGaussian(127, 127), randomGaussian(127, 127), randomGaussian(127, 127), 100];

    fill(color);
    noStroke();
    ellipse(x, y, 21, 21);
}