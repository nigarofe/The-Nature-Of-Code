let result;
let p;
let mutationRate = 0.01;

function setup() {
    createCanvas(windowWidth, windowHeight)
    result = new Array();
    for (let x = 0; x < width; x++) {
        result[x] = func(x);
    }

    p = new Population(100);
}

function draw() {
    background(0);
    strokeWeight(1);

    p.calculateError();
    p.evaluateBest();
    p.evaluateWorst();
    p.drawBest();
    p.crossover();
    p.mutate();
    drawResult();

    console.log(Math.round(p.smallestError / 100000));

    strokeWeight(4);
    textSize(30);
    fill(0, 255, 0)
    text(Math.round(frameRate()), 10, 30);
}

function func(x) {
    return x ^ 3 + 4 * x / 42 + 30;
}

function drawResult() {
    noFill();
    stroke(255);
    strokeWeight(3);
    beginShape();
    for (let x = 0; x < width; x++) {
        vertex(x, result[x]);
    }
    endShape();
}