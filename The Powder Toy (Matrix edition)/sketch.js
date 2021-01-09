let p;
let pause = false;
let lastCall = performance.now();
let optimizationVisible = false;
let inc = 10;
let optimizationRectangles = new Array();
let brushSize = 1
let isDrawing = true;

function setup() {
    createCanvas(windowWidth, windowHeight);
    p = new Population();
    frameRate(30);
    pixelDensity(1);
}

function draw() {
    if (!pause) {
        strokeWeight(0)
        background(0);
        p.render();

        fill(100, 255, 100);
        textSize(30);
        text(Math.round(frameRate()) + "    " + frameCount, 10, height / 20)
        text(("x = " + mouseX + "  y = " + mouseY), 10, height / 10)
        fill(255, 255, 0)
        drawOptimizationRectangles();
    }
    let timeSinceLastCall = performance.now() - lastCall;
    if (timeSinceLastCall > 1000) {
        if (frameCount % 120 == 0) {
            p.optimizeGraphics();
        }
    }
}

function mouseDragged() {
    lastCall = performance.now();
    p.addEntity(mouseX, mouseY, 0, 0, 0, 0, brushSize);
    console.log("N° de partículas: " + p.entities.length)
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        console.clear();
        console.table(p.matrix)
    }
    if (keyCode === RIGHT_ARROW) {
        console.log(p.entities[0].posY);
    }
    if (keyCode === DOWN_ARROW) {
        pause = !pause;
    }
}