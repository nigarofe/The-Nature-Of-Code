class Ball {
    constructor() {
        this.position = createVector(width / 2, height / 2);
        this.velocity = createVector(random(-5, 5), random(-10, 10));
        this.size = createVector(random(20), random(20));
    }

    render() {
        this.position.add(this.velocity);
        this.collide();
        ellipse(this.position.x, this.position.y, this.size.x, this.size.y);
    }

    collide() {
        if (this.position.x < 0 || this.position.x > width) {
            this.velocity.x *= -1;
        }
        if (this.position.y < 0 || this.position.y > height) {
            this.velocity.y *= -1;
        }
    }
}