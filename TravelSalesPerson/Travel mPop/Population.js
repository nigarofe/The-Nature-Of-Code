class Population {
    constructor(entitiesQuantity) {
        this.entities = new Array();
        for (let i = 0; i < entitiesQuantity; i++) {
            this.entities.push(new Entity());
        }

        this.bestEntityIndex = -1;
    }

    calculateFitness() {
        let highestFitness = 0;
        for (let i = 0; i < entitiesQuantity; i++) {
            let totalDistance = 0;
            for (let j = 0; j < citiesQuantity - 1; j++) {
                let city1 = this.entities[i].dna[j];
                let city2 = this.entities[i].dna[j + 1];
                totalDistance += dist(cities[city1].x, cities[city1].y, cities[city2].x, cities[city2].y);
            }

            let fitness = 0;
            this.entities[i].calculateDifferentGenes();
            let d = this.entities[i].differentGenesQuantity;

            if (d != 1) {
                fitness = (1 / totalDistance) * Math.pow(d, citiesQuantity);
            }
            this.entities[i].fitness = fitness;


            if (fitness > highestFitness) {
                highestFitness = fitness;
                this.bestEntityIndex = i;
            }
        }
    }

    drawBest(xOffset, yOffset, winner, loser) {
        push();
        translate(xOffset * (width / xDiv), yOffset * (height / yDiv));
        this.entities[this.bestEntityIndex].draw();

        // Draw city dots
        for (let i = 0; i < citiesQuantity; i++) {
            cities[i].draw();
        }

        fill(0);
        let fitnessMapped = this.entities[this.bestEntityIndex].fitness / fitnessMap;
        fitnessMapped = Math.floor(fitnessMapped);
        // text("Fitness = " + fitnessMapped, width / 50, height / 30);
        text(fitnessMapped, 0, height / (xDiv * yDiv) * 2);

        stroke(0);
        line(0, 0, 0, height / yDiv);
        line(0, height / yDiv, width / xDiv, height / yDiv);

        if (winner) {
            fill(0, 255, 0, 50);
            rect(0, 0, width / xDiv, height / yDiv)
        } else if (loser) {
            fill(255, 0, 0, 50);
            rect(0, 0, width / xDiv, height / yDiv)
        }
        pop();
    }

    mutate() {
        for (let i = 0; i < this.entities.length; i++) {
            if (i != this.bestEntityIndex) {
                this.entities[i].mutate();
            }
        }
    }

    crossover() {
        for (let i = 0; i < this.entities.length; i++) {
            if (i != this.bestEntityIndex) {
                let p1 = this.pickOne();
                let p2 = this.pickOne();
                let child = p1.crossover(p2);
                this.entities[i] = child;
            }
        }
        this.generations++;
    }

    pickOne() {
        while (true) {
            let randomFitness = random(this.entities[this.bestEntityIndex].fitness);
            let randomEntityIndex = Math.floor(random(this.entities.length));
            if (this.entities[randomEntityIndex].fitness > randomFitness) {
                return this.entities[randomEntityIndex];
            }
        }
    }

    createVariationsOfTheBestRight() {
        for (let i = 0; i < citiesQuantity - 1; i++) {
            this.entities[i + 1] = this.moveGenesOfTheBestToRight(i + 1);
        }
    }

    moveGenesOfTheBestToRight(q) {
        let variation = new Entity();
        let newDna = new Array();
        for (let i = citiesQuantity - q; i < citiesQuantity; i++) {
            newDna.push(this.entities[this.bestEntityIndex].dna[i]);
        }
        for (let i = 0; i < citiesQuantity - q; i++) {
            newDna.push(this.entities[this.bestEntityIndex].dna[i]);
        }
        variation.dna = newDna;
        return variation;
    }

    reset() {
        for (let i = 0; i < entitiesQuantity; i++) {
            this.entities.push(new Entity());
        }
    }
}