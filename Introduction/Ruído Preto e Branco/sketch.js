function setup() {
    createCanvas(1280, 720);
    background(0);
}

function draw() {
    loadPixels();
    let d = pixelDensity();
    let pixelsQuantity = (width * d) * (height * d);

    // Why   pixelsQuantity * 4   ?
    // Each pixel has 4 values: Red - Green - Blue - Alpha
    for (let i = 0; i < pixelsQuantity * 4; i = i + 4) {
        let cor = color(random(255));

        pixels[i] = red(cor);
        pixels[i + 1] = green(cor);
        pixels[i + 2] = blue(cor);
        pixels[i + 3] = alpha(cor);
    }
    updatePixels();
}