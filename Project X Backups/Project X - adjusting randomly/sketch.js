// Observations
// normalize data (-1, 1);

let answer;
let n;

let weightsLearningRate = 1;
let biasLearningRate = 1;

let bA = 0;
let wA = 0;
let wAA = 0;
let bAA = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    calculateAnswer();


    n = new Network(4, [1, 15, 15, 1]);
}

function draw() {
    let index3 = Math.floor(random(1, n.structure.length));
    let index2 = Math.floor(random(0, n.layers[index3].neurons.length));
    let index = Math.floor(random(0, n.layers[index3].neurons[index2].weights.length));

    let v = random(-weightsLearningRate, weightsLearningRate);
    let e1 = calculateNetworkError(n);
    n.layers[index3].neurons[index2].weights[index] += v;
    let e2 = calculateNetworkError(n);
    n.layers[index3].neurons[index2].weights[index] -= (2 * v);
    let e3 = calculateNetworkError(n);

    if (e1 < e2 && e1 < e3) {
        n.layers[index3].neurons[index2].weights[index] += v;
    } else if (e2 < e3 && e2 < e1) {
        n.layers[index3].neurons[index2].weights[index] += (2 * v);
    }


    v = random(-biasLearningRate, biasLearningRate);
    e1 = calculateNetworkError(n);
    n.layers[index3].neurons[index2].bias += v;
    e2 = calculateNetworkError(n);
    n.layers[index3].neurons[index2].bias -= (2 * v);
    e3 = calculateNetworkError(n);

    if (e1 < e2 && e1 < e3) {
        n.layers[index3].neurons[index2].bias += v;
    } else if (e2 < e3 && e2 < e1) {
        n.layers[index3].neurons[index2].bias += (2 * v);
    }



    if (frameCount % 60 == 0) {
        background(0);
        drawAnswer();
        networkDraw(n);
        showFPS();
        showMouseLocation();
        // console.clear();
        // console.log("=== In the last 60 frames === \n" + wA + " weights were adjusted by " + wAA + "\n" + bA + " biases were adjusted by " + bAA)
        bA = 0;
        wA = 0;
        wAA = 0;
        bAA = 0;
    }
}

function calculateNetworkError(network) {
    let error = 0;

    for (let x = 0; x < width; x++) {
        let y = network.calculate([x]);
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
    for (let x = 0; x < width; x++) {
        vertex(x, network.calculate([x]));
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