class Population {
    constructor() {
        this.entities = new Array();
        this.entities.push(new Particle(100, 100));
        this.entities.push(new Particle(100, 110));
    }

    render() {
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].draw();
            this.entities[i].update(this.entities, i);
        }
    }

    addEntity(x, y) {
        // Just add a paticle if there is not already a particle in that place
        let alreadyOccupied = false;
        for (let i = 0; i < this.entities.length; i++) {
            if (mouseX == this.entities[i].position.x && mouseY == this.entities[i].position.y) {
                alreadyOccupied = true;
                break;
            }
        }
        if (!alreadyOccupied) {
            this.entities.push(new Particle(mouseX, mouseY));
        }
    }
}