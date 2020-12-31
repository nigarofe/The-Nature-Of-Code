let w;
let randomCounts;
let frames;

function setup() {
    createCanvas(1280, 720);

    w = new Walker();

    randomCounts = [0, 0, 0, 0];

    frames = 0;
}

function draw() {
    background(0);

    // Move and update Walker
    w.show();
    let choice = w.move();

    text("Frames = " + frames, 30, 50);
    frames++;

    // Draw graph
    randomCounts[choice]++;
    let rectWidth = (width / 4) / randomCounts.length;
    for (let i = 0; i < randomCounts.length; i++) {
        fill(100);
        stroke(255);
        rect(i * rectWidth, height, rectWidth, -randomCounts[i]);


        fill(255);
        textSize(21);
        stroke(255);

        let direcao = "";

        switch (i) {
            case 0:
                direcao = "CIM";
                break;
            case 1:
                direcao = "BAI";
                break;
            case 2:
                direcao = "ESQ";
                break;
            case 3:
                direcao = "DIR";
                break;

        }
        text(direcao, i * rectWidth + 10, height - (randomCounts[i] / 2));
        text(randomCounts[i], i * rectWidth + 10, height - (randomCounts[i] / 2) + 30);
    }
}