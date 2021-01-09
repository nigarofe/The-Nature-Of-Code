let answer;
let p;

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(120);

    p = new Population(10);
    answer = new Array(width);
    calculateAnswer();
}

function draw() {
    background(0);

    p.think();
    p.calculateError();
    p.drawBest();
    p.mutateWeights();

    drawAnswer();
    showFPS();
}

function keyPressed() {
    if (keyCode === DOWN_ARROW) {
        console.log(nn.error)
    }
}

function showFPS() {
    stroke(255);
    strokeWeight(1);
    fill(255);
    textSize(30);
    text(Math.round(frameRate()) + ":" + frameCount, width / 100, height / 20);
}

function calculateAnswer() {
    for (let x = 0; x < width; x++) {
        // answer[x] = x ^ 3 + 4 * x / 42 + 30;
        answer[x] = x - height;
    }
}

function drawAnswer() {
    noFill();
    stroke(255);
    beginShape();
    for (let x = 0; x < width; x++) {
        vertex(x, answer[x]);
    }
    endShape();
}