class Particle {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);

        this.gravity = createVector(0, 0.01);
        this.bounciness = 0.8;

        this.isOnTop = false;
        this.wouldGoThrough = false;
        this.wouldGoThroughWall = false;
    }

    render() {
        stroke(255);
        point(this.position.x, this.position.y);
    }

    move() {
        this.velocity.add(this.gravity);
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
    }

    checkWallCollision() {
        if (this.position.y + this.velocity.y >= height) {
            this.position.y = height - 1;
            this.velocity.y *= this.bounciness;
            this.velocity.y *= -1;
            return true;
        } else {
            return false;
        }
    }

    checkIfIsOnTop(p) {
        if (this.position.x == p.position.x && this.position.y == p.position.y - 1) {
            return true;
        } else {
            return false;
        }
    }

    checkIfWouldGoThrough(p) {
        if (this.position.x == p.position.x && this.position.y + this.velocity.y >= p.position.y && this.position.y < p.position.y) {
            this.position.y = p.position.y - 1;
            return true;
        } else {
            return false;
        }
    }

    checkConflict(p) {
        if (this.position.x == p.position.x && this.position.y == p.position.y) {
            this.position.y -= 1;
        }
    }
}