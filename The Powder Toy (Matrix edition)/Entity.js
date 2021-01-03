class Entity {
    constructor(posX, posY, velX, velY, accX, accY) {
        this.posX = posX;
        this.posY = posY;
        this.velX = velX;
        // this.velY = velY;
        this.velY = random(-10, -1);
        this.accX = accX;
        // this.accY = accY;
        this.accY = random(-2, -1);
        this.active = true;
        this.needToDraw = true;
    }

    draw() {
        if (this.needToDraw) {
            // if (this.active) {
            //     stroke(255);
            // } else {
            //     stroke(127);
            // }
            stroke(255);
            point(this.posX, this.posY);
        }
    }
}