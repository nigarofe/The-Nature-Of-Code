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

    drawOne() {
        this.entities[Math.floor(random(this.entities.length))].draw();
    }

    drawBest() {
        push();
        translate(0, height / 2);
        this.entities[this.bestEntityIndex].draw();
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

    displayBestDistance() {
        fill(0);
        let fitnessMapped = this.entities[this.bestEntityIndex].fitness / fitnessMap;
        fitnessMapped = Math.floor(fitnessMapped);
        text("Fitness = " + fitnessMapped, width / 50, height / 30);
    }
}