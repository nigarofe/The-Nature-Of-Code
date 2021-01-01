class Particle {
    constructor(x, y) {
        this.position = new p5.Vector(x, y);
        this.acceleration = new p5.Vector(0, 0.1);
        this.velocity = new p5.Vector(0.2, 0);
    }

    draw() {
        //strokeWeight(10);
        stroke(255);
        point(this.position.x, this.position.y);
    }

    update(entities, itSelf) {
        // Add (acceleration to velocity) or/and (velocity to position) only if the particle wouldn't pass through
        // 1. another particle - check which particles would go through and teleport to 1 pixel above the highest particle in that x-axis
        // 2. the wall - teleport to 1 pixel above wall
        // (in this order)

        if (this.checkParticlesCollision(entities, itSelf)) {
            // teleportToHighest();
        } else {
            if (this.checkWallCollision()) {
                this.position.y = height - 1;
            } else {
                // Add acceleration to velocity
                this.velocity.add(this.acceleration);

                // Round position after adding velocity
                // Why? Possible errors when the particle is 1x1 pixel and has coords of 127,349323 x 28,321312

                this.position.add(this.velocity);
                this.position.x = Math.round(this.position.x);
                this.position.y = Math.round(this.position.y);
            }
        }
    }

    checkWallCollision() {
        if (this.acceleration.y + this.velocity.y + this.position.y > height) {
            return true;
        } else {
            return false;
        }
    }

    checkParticlesCollision(entities, itSelf) {
        let collisionDetected = false;
        for (let i = 0; i < entities.length; i++) {
            // Ignorar a si mesma
            if (i == itSelf) {

            } else {
                // Só verificar as partículas que estão acima das outras
                if (this.position.y < entities[i].position.y && this.position.x == entities[i].position.x) {
                    // Se ela ultrapassasse a outra, haveria uma colisão
                    if (this.acceleration.y + this.velocity.y + this.position.y >= entities[i].position.y) {
                        collisionDetected = true;
                    }
                }
            }
        }
        return collisionDetected;
    }
}