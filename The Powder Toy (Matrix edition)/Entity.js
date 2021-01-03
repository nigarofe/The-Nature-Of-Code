class Entity {
    constructor(posX, posY, velX, velY, accX, accY) {
        this.posX = posX;
        this.posY = posY;
        this.velX = velX;
        this.velY = velY;
        this.accX = accX;
        this.accY = accY;
    }

    draw() {
        stroke(255);
        point(this.posX, this.posY);
    }
}