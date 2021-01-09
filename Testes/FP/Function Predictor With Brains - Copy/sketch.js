let nn;

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(30);

    nn = new NeuralNetwork(4, 4);
}

function draw() {
    background(0);
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