class City {
    constructor() {
        let xWhiteSpace = width / 100;
        let yWhiteSpace = height / 100;
        this.x = random(xWhiteSpace, (width / xDiv) - xWhiteSpace);
        this.y = random(yWhiteSpace, (height / yDiv) - yWhiteSpace);
    }

    draw() {
        fill(0);
        noStroke();
        ellipse(this.x, this.y, 3, 3);
    }
}