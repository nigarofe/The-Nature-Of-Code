let increment = 0.01;
let start = 0;

function setup() {
    // createCanvas(1280, 720);
    createCanvas(windowWidth, windowHeight);
    time = 0;
    background(0);
    time = 0;
}

function draw() {
    background(0);
    stroke(255);
    strokeWeight(3);


    // Comment line for interesting effect
    noFill();

    beginShape();
    let xOffset = start;
    for (let i = 0; i < width; i++) {
        let x = i;
        let y = map(noise(xOffset), 0, 1, 0, height);
        vertex(x, y);

        xOffset += increment;
    }
    endShape();

    start += increment;

    // Diminui velocidade do gráfico
    //start += increment / 8;

    // Aumenta velocidade do gráfico
    // start += increment * 8;

}