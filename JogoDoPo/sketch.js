// Optimizations:
// Matrix? -> it seens good

// GPU -> fazer uma função que pega a aceleração e a velocidade de todas as partículas e retorna a soma dos dois, atualizando a velocidade
// GPU -> fazer uma função pega a velocidade e posição de cada tyuu das partículas e retorna o próximo x e y de todas as partículas, para converter para kernel

// Group particles by distance?
// Distance between particles?
// Disable particles that aren't in contact with air?
//Optimise your code: load code at the right time


let p;
let brushSize = 2;

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(30);
    p = new Population();

}

function draw() {;
    background(0);
    fill(255);
    textSize(30);
    text(Math.round(frameRate()), 20, 50);

    p.render();
}

function mouseDragged() {
    p.addEntity(mouseX, mouseY, brushSize);
    console.log(p.entities.length)
}