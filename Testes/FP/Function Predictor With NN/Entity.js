class Entity {
    constructor(l1q, l2q) {
        this.l1w = new Array();
        for (let i = 0; i < l1q; i++) {
            this.l1w[i] = random(-1, 1);
        }

        this.l2w = new Array();
        for (let i = 0; i < l2q; i++) {
            this.l2w[i] = random(-1, 1);
        }


        this.y = new Array();
        this.error = -1;
    }

    draw() {
        noFill();
        stroke(0, 255, 255);
        beginShape();
        for (let x = 0; x < width; x++) {
            vertex(x, this.y[x]);
        }
        endShape();
    }

    calculateError() {
        this.error = 0;
        for (let x = 0; x < width; x++) {
            this.error += Math.pow((this.y[x] - result[x]), 2);
        }
    }

    think() {
        let brain = new NeuralNetwork(this.l1w, this.l2w);
        for (let x = 0; x < width; x++) {
            this.y[x] = brain.feedForward(x);
        }
    }
}

function getMutation(entity) {
    let newEntity = new Entity();

    for (let i = 0; i < entity.l1w.length; i++) {
        if (Math.random() < mutationRate) {
            newEntity.l1w[i] = random(1);
        } else {
            newEntity.l1w[i] = entity.l1w[i];
        }
    }

    for (let i = 0; i < entity.l2w.length; i++) {
        if (Math.random() < mutationRate) {
            newEntity.l2w[i] = random(-1, 1);
        } else {
            newEntity.l2w[i] = entity.l2w[i];
        }
    }

    return newEntity;
}