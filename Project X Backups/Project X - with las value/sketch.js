// Observations
// normalize data (-1, 1);

let answer;
let p;
let drawAll = false;


function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    calculateAnswer();

    p = new Population(100, answer);
}

function draw() {
    p.calculateError();
    p.crossOver();
    p.mutate();

    if (frameCount % 1 == 0) {
        background(0);
        drawAnswer();
        showFPS();
        showMouseLocation();
        if (drawAll) {
            p.draw();
        }
        p.drawBest();
    }
}


// Answer calculation
function func(x) {
    // let y = x / 2;
    // let y = x ^ 3 + 4 * x / 42 + 30;
    let y = sin(x / 20) * 100 + 300;
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