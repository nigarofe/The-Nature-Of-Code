let nn;
let answer;

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(30);

    nn = new NeuralNetwork(5, 4);
    answer = new Array(width);
    calculateAnswer();
    nn.think();
}

function draw() {
    background(0);

    nn.draw();
    drawAnswer();
    showFPS();
}

function keyPressed() {
    if (keyCode === DOWN_ARROW) {
        console.table(nn.w)
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
        answer[x] = x ^ 3 + 4 * x / 42 + 30;
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