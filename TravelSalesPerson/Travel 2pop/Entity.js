class Entity {
    constructor() {
        this.dna = new Array(citiesQuantity);
        this.fitness = -1;

        for (let i = 0; i < citiesQuantity; i++) {
            this.dna[i] = Math.floor(random(citiesQuantity));
            // this.dna[i] = i;
        }

        this.differentGenesQuantity = -1;
    }

    draw() {
        for (let i = 0; i < citiesQuantity - 1; i++) {
            let city1 = this.dna[i];
            let city2 = this.dna[i + 1];
            stroke(255, 0, 0);
            line(cities[city1].x, cities[city1].y, cities[city2].x, cities[city2].y);
        }
    }

    draw2() {
        for (let i = 0; i < citiesQuantity - 1; i++) {
            let city1 = this.dna[i];
            let city2 = this.dna[i + 1];
            stroke(255, 0, 0);
            push();
            translate(width / 2, 0);
            line(cities[city1].x, cities[city1].y, cities[city2].x, cities[city2].y);
            pop();
        }
    }

    calculateDifferentGenes() {
        let genes = new Array();
        genes.push(this.dna[0]);
        this.differentGenesQuantity = 1;

        for (let i = 0; i < this.dna.length; i++) {
            let alreadyExists = false;
            for (let j = 0; j < genes.length; j++) {
                if (this.dna[i] == genes[j]) {
                    alreadyExists = true;
                }
            }
            if (!alreadyExists) {
                genes.push(this.dna[i]);
                this.differentGenesQuantity++;
            }
        }
    }

    mutate() {
        for (let i = 0; i < this.dna.length; i++) {
            if (Math.random() < mutationRate) {
                this.dna[i] = Math.floor(random(citiesQuantity));
            }
        }
    }

    crossover(e) {
        let child = new Entity();
        for (let i = 0; i < this.dna.length; i++) {
            if (Math.random() < 0.5) {
                child.dna[i] = this.dna[i];
            } else {
                child.dna[i] = e.dna[i];
            }
        }
        return child;
    }
}