let p;
let pause = false;

function setup() {
    createCanvas(windowWidth, windowHeight);
    p = new Population();
    frameRate(30);
    strokeWeight()
}

function draw() {
    if (!pause) {
        background(0);
        p.render();

        fill(255);
        textSize(6);
        text(Math.round(frameRate()), 10, 10)
        text(("x = " + mouseX + "  y = " + mouseY), 10, 20)
    }

}

function mouseDragged() {
    p.addEntity(mouseX, mouseY, 0, 0, 0, 0.1, 2);
    console.log(p.entities.length)
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