class Particle {
    constructor(x, y) {
        this.position = new p5.Vector(x, y);
        this.acceleration = new p5.Vector(0, 0.1);
        this.velocity = new p5.Vector(0.2, 0);
    }

    draw() {
            strokeWeight(1);
            stroke(255);
            point(this.position.x, this.position.y);
        }
        // update(entities, itSelf) {
    update = gpu.createKernel(function(entities, itSelf) {

        // Só fazer o update se estiver em contato com o ar

        // Add (acceleration to velocity) or/and (velocity to position) only if the particle wouldn't pass through
        // 1. another particle - check which particles would go through and teleport to 1 pixel above the highest particle in that x-axis
        // 2. the wall - teleport to 1 pixel above wall
        // (in this order)
        // Why? If it would compare to the walls first, the particle would teleport directly to 1 pixel above it, and maybe occupy the same space of another particle

        if (this.checkParticlesCollision(entities, itSelf)) {
            this.moveToBelow(entities, itSelf);
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
    }).setOutput([1, 1]);

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
            // Só verificar as partículas que estão acima das outras
            if (this.position.y < entities[i].position.y && this.position.x == entities[i].position.x) {
                // Ignorar a si mesma
                if (i == itSelf) {

                } else {

                    // Se ela ultrapassasse a outra, haveria uma colisão
                    if (this.acceleration.y + this.velocity.y + this.position.y >= entities[i].position.y) {
                        collisionDetected = true;
                        break;
                    }
                }
            }
        }
        return collisionDetected;
    }

    moveToBelow(entities, itSelf) {
        let somethingIsBelow = false;
        for (let i = 0; i < entities.length; i++) {
            // Só verificar as partículas que estão na mesma linha vertical
            if (entities[i].position.x == this.position.x) {
                // Ignorar a si mesma
                if (i == itSelf) {

                } else {
                    if (entities[i].position.y == this.position.y + 1) {
                        somethingIsBelow = true;
                        break;
                    }
                }
            }
        }
        if (!somethingIsBelow) {
            this.position.y++;
        }
    }
    isStuck() {
        // Matrix could make this function work
        return true;
    }
}