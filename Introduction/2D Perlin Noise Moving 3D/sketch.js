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

    //noLoop();
}

function draw() {
    loadPixels();

    yOffset = 0;
    for (let x = 0; x < width; x++) {
        // Move in horizontal
        xOffset = 0;
        for (let y = 0; y < height; y++) {
            let index = (x + y * width) * 4;
            let aColor = map(noise(xOffset, yOffset, start), 0, 1, 0, 255);

            // R G B A
            pixels[index] = aColor;
            pixels[index + 1] = aColor;
            pixels[index + 2] = aColor;
            pixels[index + 3] = 255;


            xOffset += increment;
        }
        yOffset += increment;
    }
    updatePixels();

    start += increment * 8;
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