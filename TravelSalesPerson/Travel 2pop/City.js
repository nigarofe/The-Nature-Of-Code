class City {
    constructor() {
        this.x = random(width / 2);
        this.y = random(height / 2);
    }

    draw() {
        fill(0);
        noStroke();
        ellipse(this.x, this.y, 10, 10);
    }
}