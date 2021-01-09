// worst one need to have the same time that others had before being reseted again

let citiesQuantity = 30;
let cities;
let entitiesQuantity = 100;
let populations;
let mutationRate = 0.05;
let paused = false;
let fitnessMap = 999999999999999999999999999999999999;
let xDiv = 10;
let yDiv = 10;

let drawPaths = true;
let sumOfFitness = 0;
let average = 0;

let bestFitness = 0;
let lowestFitnessIndex = -1;

// Graph things
let xs;
let ys;
let ysBest;
let xsBest;
let ysWorst;
let xsWorst;
let drawGraph = false;

function setup() {
    createCanvas(windowWidth, windowHeight);

    cities = new Array();
    for (let i = 0; i < citiesQuantity; i++) {
        cities.push(new City());
    }

    populations = new Array(); {
        for (let i = 0; i < xDiv * yDiv; i++) {
            populations.push(new Population(entitiesQuantity));
        }
    }

    xs = new Array();
    ys = new Array();
    ysBest = new Array();
    xsBest = new Array();
    ysWorst = new Array();
    xsWorst = new Array();
}

function draw() {
    if (!paused) {
        background(255);

        let lowestFitness = Infinity;
        sumOfFitness = 0;

        for (let i = 0; i < populations.length; i++) {
            populations[i].calculateFitness();

            // Data normalization
            let f = populations[i].entities[populations[i].bestEntityIndex].fitness;
            f /= fitnessMap;
            f = Math.floor(f);
            sumOfFitness += f;


            if (f >= bestFitness) {
                bestFitness = f;
                populations[i].drawBest(i % xDiv, Math.floor(i / xDiv), true, false);
                ysBest.push(bestFitness);
                xsBest.push(frameCount);
            } else if (f <= lowestFitness) {
                lowestFitness = f;
                lowestFitnessIndex = i;
                if (drawPaths) {
                    populations[i].drawBest(i % xDiv, Math.floor(i / xDiv), false, false);
                }
            } else if (drawPaths) {
                populations[i].drawBest(i % xDiv, Math.floor(i / xDiv), false, false);
            }
            populations[i].crossover();
            populations[i].mutate();
            populations[i].createVariationsOfTheBestRight();
        }
        // mutation rate = 1
        ysWorst.push(lowestFitness);
        xsWorst.push(frameCount);


        // mutation rate = 0.05
        populations[lowestFitnessIndex].drawBest(lowestFitnessIndex % xDiv, Math.floor(lowestFitnessIndex / xDiv), false, true);
        // populations[lowestFitnessIndex].reset();
    }
    if (drawGraph) {
        drawGenGraph();
    }
    fill(0);
    text(Math.round(frameRate()), 10, 10);

    average = Math.round(sumOfFitness / (xDiv * yDiv));
    xs.push(frameCount);
    ys.push(average);
}

function keyPressed() {
    if (keyCode === DOWN_ARROW) {
        paused = !paused;
    }
    if (keyCode === LEFT_ARROW) {
        drawGraph = !drawGraph;
        drawPaths = !drawPaths;
    }
}

function drawGenGraph() {
    background(255);
    fill(127);
    rect(0, 0, width, height);
    let border = 100;
    stroke(0);
    noFill();

    // Axis
    strokeWeight(2);
    line(border, height - border, width - border, height - border);
    line(border, border, border, height - border);

    strokeWeight(1);
    text(average, border, border);
    text(frameCount, width - border, height - border);


    strokeWeight(5);
    // Graph average
    stroke(255, 255, 0);
    beginShape();
    for (let i = 0; i < xs.length; i++) {
        let x = map(xs[i], 0, frameCount, 0 + border, width - border)
        let y = map(ys[i], 0, bestFitness, height - border, 0 + border);
        vertex(x, y);
    }
    endShape();

    // Graph best
    stroke(0, 255, 0)
    beginShape();
    for (let i = 0; i < xsBest.length; i++) {
        let x = map(xsBest[i], 0, frameCount, 0 + border, width - border)
        let y = map(ysBest[i], 0, bestFitness, height - border, 0 + border);
        vertex(x, y);
    }
    endShape();

    // Graph worst
    stroke(255, 0, 0)
    beginShape();
    for (let i = 0; i < xsWorst.length; i++) {
        let x = map(xsWorst[i], 0, frameCount, 0 + border, width - border)
        let y = map(ysWorst[i], 0, bestFitness, height - border, 0 + border);
        vertex(x, y);
    }
    endShape();


    strokeWeight(1);
}