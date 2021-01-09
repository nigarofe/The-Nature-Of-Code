class Entity {
    constructor() {
        this.y = new Array();
        for (let x = 0; x < width; x++) {
            this.y[x] = random(height);
        }

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
}

function getMutation(entity) {
    let newEntity = new Entity();

    for (let x = 0; x < width; x++) {
        if (Math.random() < mutationRate) {
            newEntity.y[x] = random(height);
        } else {
            newEntity.y[x] = entity.y[x];
        }
    }
    return newEntity;
}