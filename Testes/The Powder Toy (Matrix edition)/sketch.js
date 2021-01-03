let p;

function setup() {
    createCanvas(windowWidth, windowHeight);
    p = new Population();
}

function draw() {
    if (frameCount <= 100) {
        background(0);
        p = new Population();
        //p.render();
        console.log(time);
    }
}