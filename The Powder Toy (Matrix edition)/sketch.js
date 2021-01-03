let p;
let pause = false;
let lastCall = performance.now();
let optimizationVisible = false;
let inc = 10;
let optimizationRectangles = new Array();
let brushSize = 1

function setup() {
    createCanvas(windowWidth, windowHeight);
    p = new Population();
    frameRate(30);
}

function draw() {
    if (!pause) {
        strokeWeight(0)
        background(0);
        p.render();

        fill(255);
        textSize(6);
        text(Math.round(frameRate()), 10, 10)
        text(("x = " + mouseX + "  y = " + mouseY), 10, 20)
        text((frameCount), 30, 10)
        fill(255, 255, 0)
        drawOptimizationRectangles();
    }
    let timeSinceLastCall = performance.now() - lastCall;
    if (timeSinceLastCall > 5000) {
        if (frameCount % 120 == 0) {
            p.optimizeGraphics();
        }
    }
}

function mouseDragged() {
    lastCall = performance.now();
    p.addEntity(mouseX, mouseY, 0, 0, 0, 0, brushSize);
    p.addEntity(mouseX - 1, mouseY, 0, 0, 0, 0, brushSize);
    p.addEntity(mouseX - 2, mouseY, 0, 0, 0, 0, brushSize);
    p.addEntity(mouseX - 3, mouseY, 0, 0, 0, 0, brushSize);
    p.addEntity(mouseX - 4, mouseY, 0, 0, 0, 0, brushSize);
    p.addEntity(mouseX - 5, mouseY, 0, 0, 0, 0, brushSize);
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