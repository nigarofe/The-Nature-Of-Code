let citiesQuantity = 30;
let cities;
let entitiesQuantity = 1000;
let population;
let population2;
let mutationRate = 0.05;
let paused = false;
let fitnessMap = 99999999999999999999999999999999999999;

function setup() {
    createCanvas(windowWidth, windowHeight);

    cities = new Array();
    for (let i = 0; i < citiesQuantity; i++) {
        cities.push(new City());
    }

    population = new Population(entitiesQuantity);
    population2 = new Population2(entitiesQuantity);
}

function draw() {
    if (!paused) {
        background(255);

        // Draw city dots
        for (let i = 0; i < citiesQuantity; i++) {
            cities[i].draw();
        }
        push();
        translate(0, height / 2);
        for (let i = 0; i < citiesQuantity; i++) {
            cities[i].draw();
        }
        pop();


        push();
        translate(width / 2, 0);
        for (let i = 0; i < citiesQuantity; i++) {
            cities[i].draw();
        }
        pop()

        push();
        translate(width / 2, height / 2);
        for (let i = 0; i < citiesQuantity; i++) {
            cities[i].draw();
        }
        pop();

        stroke(0);
        line(width / 2, 0, width / 2, height);




        population.drawOne();
        population.calculateFitness();
        population.drawBest();
        population.crossover();
        population.mutate();
        population.createVariationsOfTheBestRight();
        population.displayBestDistance();

        population2.drawOne();
        population2.calculateFitness();
        population2.drawBest();
        population2.crossover();
        population2.mutate();
        population2.createVariationsOfTheBestRight();
        population2.displayBestDistance();

    }
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        for (let i = 0; i < entitiesQuantity; i++) {
            console.log(i + " = " + population.entities[i].fitness + " @" + population.entities[i].differentGenesQuantity);
        }
        console.log("population.bestEntityIndex = " + population.bestEntityIndex);
    }
    if (keyCode === DOWN_ARROW) {
        for (let i = 0; i < citiesQuantity; i++) {
            console.log(population.entities[i].dna);
        }
    }
}