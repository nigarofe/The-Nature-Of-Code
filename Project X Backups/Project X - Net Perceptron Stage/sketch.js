// Observations
// normalize data (-1, 1);

let answer;
let net1;
let net2;


function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(30);
    calculateAnswer();


    net1 = new Network(4, [1, 4, 3, 1]);
    net2 = new Network(4, [1, 4, 3, 1]);
}

function draw() {
    background(0);
    drawAnswer();


    let error1 = calculateNetworkError(net1);
    let error2 = calculateNetworkError(net2);
    if (error1 > error2) {
        net1 = Network.getMutation(net2);
        console.log("net1 died");
    } else {
        net2 = Network.getMutation(net1);
        console.log("net2 died");
    }



    showFPS();
    showMouseLocation();
}

function calculateNetworkError(network) {
    let error = 0;

    stroke(255, 255, 255);
    strokeWeight(3);
    noFill();

    beginShape();
    for (let x = 0; x < width; x++) {
        let y = network.calculate([x]);
        error += Math.pow(answer[x] - y, 2);
        vertex(x, y);
    }
    endShape();
    return error;
}

// Answer calculation
function func(x) {
    let y = x * 3;
    // let y = x ^ 3 + 4 * x / 42 + 30;
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
    strokeWeight(3);
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
    text(Math.round(frameRate()) + ":" + frameCount, width / 100, height / 20);
}

function showMouseLocation() {
    stroke(255);
    strokeWeight(1);
    fill(255);
    textSize(30);
    text("x = " + mouseX + " y = " + mouseY, width / 100, height / 10);
}