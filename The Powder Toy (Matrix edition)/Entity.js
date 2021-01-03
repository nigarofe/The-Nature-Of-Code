class Entity {
    constructor(posX, posY, velX, velY, accX, accY) {
        this.posX = posX;
        this.posY = posY;
        this.velX = velX;
        this.velY = velY;
        this.accX = accX;
        this.accY = accY;
        this.active = true;
        this.needToDraw = true;
    }

    draw() {
        if (this.needToDraw) {
            if (this.active) {
                stroke(255);
            } else {
                stroke(127);
            }

            point(this.posX, this.posY);
        }
    }
}