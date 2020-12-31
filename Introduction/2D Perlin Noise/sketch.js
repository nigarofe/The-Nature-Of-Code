let xOffset;
let yOffset;

function setup() {
    createCanvas(1280, 720);
    background(0);

    yOffset = 0;
    pixelDensity(1);

    noLoop();
}

function draw() {
    loadPixels();

    for (let x = 0; x < width; x++) {
        xOffset = 0;
        for (let y = 0; y < height; y++) {
            let index = (x + y * width) * 4;
            let aColor = map(noise(xOffset, yOffset), 0, 1, 0, 255);

            pixels[index] = aColor;
            pixels[index + 1] = aColor;
            pixels[index + 2] = aColor;
            pixels[index + 3] = 255;
            xOffset += 0.01;
        }
        yOffset += 0.01;
    }

    updatePixels();


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