class Population {
    constructor(quantity, arg1, arg2) {
        this.entities = new Array();
        for (let i = 0; i < quantity; i++) {
            this.entities.push(new Entity(arg1, arg2));
        }

        this.bestIndex = -1;
        this.worstIndex = -1;
        this.smallestError = -1;
        this.biggestError = -1;
    }

    think() {
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].think();
        }
    }

    drawBest() {
        this.entities[this.bestIndex].draw();
    }

    calculateError() {
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].calculateError();
        }
    }

    evaluateBest() {
        this.smallestError = Infinity;
        for (let i = 0; i < this.entities.length; i++) {
            if (this.entities[i].error <= this.smallestError) {
                this.smallestError = this.entities[i].error;
                this.bestIndex = i;
            }
        }
    }

    evaluateWorst() {
        this.biggesttError = 0;
        for (let i = 0; i < this.entities.length; i++) {
            if (this.entities[i].error >= this.biggestError) {
                this.biggestError = this.entities[i].error;
                this.worstIndex = i;
            }
        }
    }

    mutate() {
        for (let i = 0; i < this.entities.length; i++) {
            if (i != this.bestIndex) {
                this.entities[i] = getMutation(this.entities[i]);
            }
        }
    }

    pickOne() {
        while (true) {
            let error = random(this.smallestError, this.biggestError);
            let index = Math.floor(random(this.entities.length));
            if (this.entities[index].error < error) {
                return this.entities[index];
            }
        }
    }

    crossover() {
        for (let i = 0; i < this.entities.length; i++) {
            if (i != this.bestIndex) {
                let e1 = this.pickOne();
                let e2 = this.pickOne();

                let newEntity = new Entity();
                for (let x = 0; x < width; x++) {
                    if (Math.random() < 0.5) {
                        newEntity.y[x] = e1.y[x];
                    } else {
                        newEntity.y[x] = e2.y[x];
                    }
                }
                this.entities[i] = newEntity;
            }
        }
    }
}