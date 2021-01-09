let citiesQuantity = 30;
let cities;
let entitiesQuantity = 1000;
let population;
let mutationRate = 0.05;
let paused = false;

function setup() {
    createCanvas(windowWidth, windowHeight);

    cities = new Array();
    for (let i = 0; i < citiesQuantity; i++) {
        cities.push(new City());
    }

    population = new Population(entitiesQuantity);
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




        population.drawOne();
        population.calculateFitness();
        population.drawBest();
        population.crossover();
        population.mutate();
        population.createVariationsOfTheBestRight();
        // population.createVariationsOfTheBestLeft();
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