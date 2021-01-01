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

    addEntity(x, y, r) {
        for (let h = x - r; h <= x + r; h++) {
            for (let v = y - r; v <= y + r; v++) {
                let xNow = h;
                let yNow = v;

                // Just add a paticle if there is not already a particle in that place
                let alreadyOccupied = false;
                for (let i = 0; i < this.entities.length; i++) {
                    if (xNow == this.entities[i].position.x && yNow == this.entities[i].position.y) {
                        alreadyOccupied = true;
                        break;
                    }
                }
                if (!alreadyOccupied) {
                    this.entities.push(new Particle(xNow, yNow));
                }
            }
        }

        console.log(this.entities.length)
    }

    // addEntity(x, y) {
    //     // Just add a paticle if there is not already a particle in that place
    //     let alreadyOccupied = false;
    //     for (let i = 0; i < this.entities.length; i++) {
    //         if (x == this.entities[i].position.x && y == this.entities[i].position.y) {
    //             alreadyOccupied = true;
    //             break;
    //         }
    //     }
    //     if (!alreadyOccupied) {
    //         this.entities.push(new Particle(mouseX, mouseY));
    //     }
    // }
}