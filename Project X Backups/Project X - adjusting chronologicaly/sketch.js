// Observations
// normalize data (-1, 1);

let answer;
let n;

let weightsLearningRate = 0.1;
let biasLearningRate = 1000;

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    calculateAnswer();


    n = new Network(10, [1, 5, 5, 5, 5, 5, 5, 5, 5, 1]);
}

function draw() {
    for (let i = 1; i < n.structure.length; i++) {
        // console.log(i)
        for (let j = 0; j < n.layers[i].neurons.length; j++) {
            let v = 0;
            for (let k = 0; k < n.layers[i].neurons[j].weights.length; k++) {
                v = random(-weightsLearningRate, weightsLearningRate)
                let error1 = calculateNetworkError(n);
                n.layers[i].neurons[j].weights[k] += v;
                let error2 = calculateNetworkError(n);
                if (error2 > error1) {
                    n.layers[i].neurons[j].weights[k] -= v;
                } else {
                    console.log("weight adjusted");
                }
            }
            v = random(-biasLearningRate, biasLearningRate);
            let error3 = calculateNetworkError(n);
            n.layers[i].neurons[j].bias += v;
            let error4 = calculateNetworkError(n);
            if (error4 > error3) {
                n.layers[i].neurons[j].bias -= v;
            } else {
                console.log("bias adjusted")
            }
        }
    }

    // if (frameCount % 1 == 0) {
    background(0);
    drawAnswer();
    networkDraw(n);
    showFPS();
    showMouseLocation();
    // }
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