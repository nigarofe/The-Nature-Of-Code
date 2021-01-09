// Observations
// normalize data (-1, 1);

let answer;
let n, n2;


function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(30);

    calculateAnswer();
    n = new Neuron(1);
    n2 = new Neuron(1);
}

function draw() {
    background(0);
    drawAnswer();






    let error = 0;
    stroke(0, 255, 255);
    beginShape();
    for (let x = 0; x < width; x++) {
        let y = n.calculate([x]);
        vertex(x, y);
        error += Math.pow(answer[x] - y, 2);
    }
    endShape();
    // console.log(error);
    let error2 = 0;
    stroke(255, 255, 0);
    beginShape();
    for (let x = 0; x < width; x++) {
        let y = n2.calculate([x]);
        vertex(x, y);
        error2 += Math.pow(answer[x] - y, 2);
    }
    endShape();


    if (error <= error2) {
        console.log("n2 died")
        n2 = Neuron.getMutation(n);
    } else {
        n = Neuron.getMutation(n2);
        console.log("n died")
    }





    // n = Neuron.getMutation(n);





    showFPS();
    showMouseLocation();
}

// Answer calculation
function func(x) {
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