// Observations
// normalize data (-1, 1);

let answer;
let l;


function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(30);

    calculateAnswer();
    l = new Layer(4, 3);
}

function draw() {
    background(0);
    drawAnswer();

    console.log(l.calculate([1, 4, 7]));




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