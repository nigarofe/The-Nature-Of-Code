let particles;

function setup() {
    createCanvas(1280, 720);
    particles = new Array();
    particles.push(new Particle(10, 700));
    particles.push(new Particle(10, 701));
    particles.push(new Particle(10, 702));
    particles.push(new Particle(10, 703));
    particles.push(new Particle(10, 704));
}

function draw() {
    background(0);
    for (let i = 0; i < particles.length; i++) {
        //console.log(i + " = " + particles[i].position.y)
        particles[i].render();

        particles[i].isOnTop = false;
        for (let j = i + 1; j < particles.length; j++) {
            if (particles[i].checkIfIsOnTop(particles[j])) {
                particles[i].isOnTop = true;
            }
        }

        particles[i].wouldGoThrough = false;
        for (let j = i + 1; j < particles.length; j++) {
            if (particles[i].checkIfWouldGoThrough(particles[j])) {
                particles[i].wouldGoThrough = true;
            }
        }

        particles[i].wouldGoThroughWall = false;
        if (particles[i].checkWallCollision() == true) {
            particles[i].wouldGoThroughWall = true;
        }

        // A partícula vai se mover normalmente, com três exceções:
        // Se ela estiver em cima de outra partícula
        // Se ela atravessasse outra partícula
        // Se ela atravessasse a borda da tela
        if (!particles[i].isOnTop && !particles[i].wouldGoThrough && !particles[i].wouldGoThroughWall) {
            particles[i].move();
        }

        // Subir a partícula 1 pixel caso o lugar já esteja ocupado

        for (let j = i + 1; j < particles.length; j++) {
            particles[i].checkConflict(particles[j]);
        }


        particles[i].checkWallCollision();

    }
    //console.log("======================");
}

function mouseDragged() {

    // If there is already a particle, don't create another in the same place
    let exists = false;
    for (let i = 0; i < particles.length; i++) {
        if (particles[i].position.x == Math.round(mouseX) && particles[i].position.y == Math.round(mouseY)) {
            exists = true;
        }
        // Same thing for sister particles
        if (particles[i].position.x == Math.round(mouseX) - 1 && particles[i].position.y == Math.round(mouseY)) {
            exists = true;
        }
        if (particles[i].position.x == Math.round(mouseX) + 1 && particles[i].position.y == Math.round(mouseY)) {
            exists = true;
        }
        if (particles[i].position.x == Math.round(mouseX) && particles[i].position.y == Math.round(mouseY) - 1) {
            exists = true;
        }
        if (particles[i].position.x == Math.round(mouseX) && particles[i].position.y == Math.round(mouseY) + 1) {
            exists = true;
        }
    }
    if (!exists) {
        particles.push(new Particle(mouseX, mouseY));
        console.log("No exists")
    } else {
        console.log("Exists!")
    }



    particles.push(new Particle(mouseX - 1, mouseY));
    particles.push(new Particle(mouseX + 1, mouseY));
    particles.push(new Particle(mouseX, mouseY - 1));
    particles.push(new Particle(mouseX, mouseY + 1));
}