// Observations
// normalize data (-1, 1);

let answer;
let nets;


function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    calculateAnswer();


    nets = new Array(30);
    for (let i = 0; i < nets.length; i++) {
        nets[i] = new Network(4, [2, 8, 8, 1]);
        // nets[i] = new Network(20, [2, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1]);
        // nets[i] = new Network(38, [1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1]);
        // nets[i] = new Network(10, [1, 5, 5, 5, 5, 5, 5, 5, 5, 1]);
        // nets[i] = new Network(5, [1, 16, 16, 16, 1]);
        // nets[i] = new Network(5, [1, 4, 16, 16, 1]);
    }
}

function draw() {
    let smallestError = Infinity;
    let bestIndex = -1;
    let errors = new Array(nets.length);
    for (let i = 0; i < nets.length; i++) {
        errors[i] = calculateNetworkError(nets[i]);
        if (errors[i] < smallestError) {
            smallestError = errors[i];
            bestIndex = i;
        }
    }

    for (let i = 0; i < nets.length; i++) {
        if (i != bestIndex) {
            // nets[i] = Network.getMutation(nets[bestIndex]);
            nets[i] = Network.getMutation(nets[bestIndex]);
        }
    }

    if (frameCount % 10 == 0) {
        background(0);
        drawAnswer();
        networkDraw(nets[bestIndex]);
        showFPS();
        showMouseLocation();
    }
}

function calculateNetworkError(network) {
    let error = 0;

    for (let x = 1; x < width; x++) {
        let y = network.calculate([x, answer[x - 1]]);
        if (answer[x] - y < 0) {
            error += -1 * (answer[x] - y);
        } else {
            error += answer[x] - y;
        }

    }
    return error;
}

function networkDraw(network) {
    stroke(255, 255, 255);
    strokeWeight(1);
    noFill();

    beginShape();
    for (let x = 1; x < width; x++) {
        vertex(x, network.calculate([x, answer[x - 1]]));
    }
    endShape();
}

// Answer calculation
function func(x) {
    // let y = x / 2;
    let y = x ^ 3 + 4 * x / 42 + 30;
    //y = map(y, 0, height, -1, 1);
    return y;
}

function calculateAnswer() {
    answer = new Array();
    for (let x = 0; x < width; x++) {
        answer.push(func(x));
    }
}

function drawAnswer() {
    stroke(0, 255, 0);
    strokeWeight(5);
    noFill();
    beginShape();
    for (let x = 0; x < width; x++) {
        vertex(x, answer[x]);
    }
    endShape();
}

// Setup stuff
function keyPressed() {
    if (keyCode === DOWN_ARROW) {

    }
}

function showFPS() {
    stroke(255);
    strokeWeight(1);
    fill(255);
    textSize(30);
    text(Math.round(frameRate()) + ":" + frameCount, width / 100, height - height / 20);
}

function showMouseLocation() {
    stroke(255);
    strokeWeight(1);
    fill(255);
    textSize(30);
    text("x = " + mouseX + " y = " + mouseY, width / 100, height - height / 10);
}