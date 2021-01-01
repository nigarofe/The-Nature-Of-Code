class Ball {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = createVector(random(-5, 5), random(-10, 10));
        this.diameter = 20;
    }

    render() {
        this.position.add(this.velocity);
        ellipse(this.position.x, this.position.y, this.diameter, this.diameter);
    }

    collide() {
        if (this.position.x < 0 || this.position.x > width) {
            this.velocity.x *= -1;
        }
        if (this.position.y < 0 || this.position.y > height) {
            this.velocity.y *= -1;
        }
    }

    collideWithBall(b) {
        if (this.position.x < b.position.x + b.diameter / 2 && this.position.x > b.position.x - b.diameter) {
            if (this.position.y > b.position.y - b.diameter / 2 && this.position.y < b.position.y + b.diameter / 2) {
                console.log("Collision");
                this.velocity.mult(-1);
                b.velocity.mult(-1);
            }
        }
    }
}