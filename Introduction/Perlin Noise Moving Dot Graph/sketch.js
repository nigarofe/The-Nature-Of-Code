let increment = 0.01;
let start = 0;

function setup() {
    createCanvas(1280, 720);
    time = 0;
    background(0);
    time = 0;
}

function draw() {
    background(0);
    stroke(255);

    let xOffset = start;
    for (let i = 0; i < width; i++) {
        let x = i;
        let y = map(noise(xOffset), 0, 1, 0, height);
        point(x, y);

        xOffset += increment;
    }

    start += increment;

    // Diminui velocidade do gráfico
    //start += increment / 8;

    // Aumenta velocidade do gráfico
    //start += increment * 8; 

}