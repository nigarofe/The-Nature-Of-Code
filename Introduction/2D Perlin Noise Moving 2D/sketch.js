let increment = 0.01;
let xOffset;
let yOffset;
let start;

function setup() {
    createCanvas(1280, 720);
    background(0);

    start = 0;
    yOffset = 0;
    pixelDensity(1);
}

function draw() {
    loadPixels();

    yOffset = start;
    for (let x = 0; x < width; x++) {
        // Move in horizontal
        xOffset = 0;

        // Move in diagonal
        xOffset = 0 + start;
        for (let y = 0; y < height; y++) {
            let index = (x + y * width) * 4;
            let aColor = map(noise(xOffset, yOffset), 0, 1, 0, 255);

            // R G B A
            pixels[index] = 0;
            pixels[index + 1] = 0;
            pixels[index + 2] = aColor;
            pixels[index + 3] = 255;


            xOffset += increment;
        }
        yOffset += increment;
    }
    updatePixels();

    start += increment * 4;
}

/*

loadPixels();

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let index = (x + y * width) * 4;
            pixels[index] = random(255);
            pixels[index + 1] = 0;
            pixels[index + 2] = 0;
            pixels[index + 3] = 255;
        }
    }

    updatePixels();

*/