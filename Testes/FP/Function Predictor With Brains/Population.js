class Population {
    constructor(quantity) {
        this.entities = new Array(quantity);
        for (let i = 0; i < quantity; i++) {
            this.entities[i] = new NeuralNetwork(10, 10);
        }

        this.bestIndex = -1;
        this.smallestError = Infinity;
    }

    think() {
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].think();
        }
    }

    calculateError() {
        this.smallestError = Infinity;
        for (let i = 0; i < this.entities.length; i++) {
            let error = this.entities[i].calculateError()
            if (error < this.smallestError) {
                this.smallestError = error;
                this.bestIndex = i;
            }
        }
    }

    drawBest() {
        this.entities[0].draw();
        this.entities[this.bestIndex].draw();
    }

    mutateWeights() {
        for (let i = 0; i < this.entities.length; i++) {
            if (i != this.bestIndex) {
                this.entities[i].mutateWeights();
            }
        }
    }

    mutateThreshold() {
        for (let i = 0; i < this.entities.length; i++) {
            if (i != this.bestIndex) {
                this.entities[i].mutateThreshold();
            }
        }
    }
}