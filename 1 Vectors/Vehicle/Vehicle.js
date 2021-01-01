class Vehicle {
    constructor() {
        this.position = createVector(width / 2, height / 2);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.maximumSpeed = 100;
        this.size = createVector(21, 21);
        this.gravity = createVector(0, 0.1);
        this.bounciness = 0.5;
        this.friction = 0.99;
    }

    render() {
        noStroke();
        fill(255);
        ellipse(this.position.x, this.position.y, this.size.x, this.size.y);
    }

    update() {
        this.collideBorder();

        this.velocity.add(this.gravity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maximumSpeed);
        this.position.add(this.velocity);
    }

    setAcceleration(vector) {
        this.acceleration = vector;
    }

    collideBorder() {
        if (this.position.x + this.size.x / 2 > width) {
            this.position.x = width - this.size.x / 2;
            this.velocity.x *= this.bounciness;
            this.velocity.x *= -1;
        } else if (this.position.x - this.size.x / 2 < 0) {
            this.position.x = 0 + this.size.x / 2;
            this.velocity.x *= this.bounciness;
            this.velocity.x *= -1;
        }


        if (this.position.y + this.size.y / 2 > height) {
            this.position.y = height - this.size.y / 2;
            this.velocity.x *= this.friction;

            this.velocity.y *= this.bounciness;
            this.velocity.y *= -1;
        } else if (this.position.y - this.size.y / 2 < 0) {
            this.position.y = 0 + this.size.y / 2;
            this.velocity.x *= this.friction;

            this.velocity.y *= this.bounciness;
            this.velocity.y *= -1;
        }
    }
}