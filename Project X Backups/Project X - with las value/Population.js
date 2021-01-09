class Population {
    constructor(size, answerArray) {
        this.nets = new Array(size);
        for (let i = 0; i < size; i++) {
            this.nets[i] = new Network(6, [2, 5, 5, 5, 5, 1]);
        }

        this.answerArray = answerArray;
        this.bestIndex = -1;
        this.errors;
        this.smallestError;
        this.biggestError;
    }

    calculateError() {
        this.smallestError = Infinity;
        this.biggestError = 0;

        this.errors = new Array(this.nets.length);
        for (let i = 0; i < this.nets.length; i++) {
            this.errors[i] = Network.calculateNetworkError(this.nets[i], this.answerArray);
            if (this.errors[i] < this.smallestError) {
                this.smallestError = this.errors[i];
                this.bestIndex = i;
            }
            if (this.errors[i] > this.biggestError) {
                this.biggestError = this.errors[i];
            }
        }
    }

    mutate() {
        for (let i = 0; i < this.nets.length; i++) {
            if (i != this.bestIndex) {
                this.nets[i] = Network.getMutation(this.nets[i]);
            }
        }
    }

    draw() {
        for (let i = 0; i < this.nets.length; i++) {
            stroke(random(255), random(255), random(255));
            strokeWeight(1);
            noFill();

            beginShape();
            for (let x = 1; x < width; x++) {
                vertex(x, this.nets[i].calculate([x, this.answerArray[x - 1]]));
            }
            endShape();
        }
    }

    drawBest() {
        stroke(255, 255, 255);
        strokeWeight(2);
        noFill();

        beginShape();
        for (let x = 0; x < width; x++) {
            vertex(x, this.nets[this.bestIndex].calculate([x, this.answerArray[x - 1]]));
        }
        endShape();
    }

    crossOver() {
        for (let l = 0; l < this.nets.length; l++) {
            if (l != this.bestIndex) {
                let n1 = this.pickOne();
                let n2 = this.pickOne();
                // new Network(5, [1, 10, 20, 10, 1]);
                let child = new Network(n1.layers.length, n1.structure);
                for (let i = 1; i < n1.layers.length; i++) {
                    for (let j = 0; j < n1.layers[i].neurons.length; j++) {
                        for (let k = 0; k < n1.layers[i].neurons[j].weights.length; k++) {
                            if (Math.random() < 0.5) {
                                child.layers[i].neurons[j].weights[k] = n1.layers[i].neurons[j].weights[k];
                            } else {
                                child.layers[i].neurons[j].weights[k] = n2.layers[i].neurons[j].weights[k];
                            }
                        }
                    }
                }
                this.nets[l] = child;
            }
        }
    }

    pickOne() {
        while (true) {
            let randomError = random(this.smallestError, this.biggestError);
            let randomIndex = Math.floor(random(this.nets.length));
            if (this.errors[randomIndex] < randomError) {
                return this.nets[randomIndex];
            }
        }
    }


}