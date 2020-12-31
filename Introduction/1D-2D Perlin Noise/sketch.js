let xOffset;

function setup() {
    createCanvas(100, 100);
    background(0);
    xOffset = 0;
}

function draw() {
    loadPixels();
    let d = pixelDensity();
    let pixelsQuantity = (width * d) * (height * d);

    // Why   pixelsQuantity * 4   ?
    // Each pixel has 4 values: Red - Green - Blue - Alpha
    for (let i = 0; i < pixelsQuantity * 4; i = i + 4) {
        let cor = color(map(noise(xOffset), 0, 1, 0, 255));

        pixels[i] = red(cor);
        pixels[i + 1] = green(cor);
        pixels[i + 2] = blue(cor);
        pixels[i + 3] = alpha(cor);
        xOffset += 0.01;
    }
    updatePixels();
}