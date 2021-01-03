let time = 0;

class Population {
    constructor() {
        // Matriz para facilitar na hora de verificar se uma posição específica está ocupada
        this.matrix = new Array(height);
        for (let i = 0; i < this.matrix.length; i++) {
            this.matrix[i] = new Array(width);
            for (let j = 0; j < this.matrix[i].length; j++) {
                this.matrix[i][j] = 0;
            }
        }

        this.entities = new Array();
    }

    render() {
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].draw();
            let newVelX = this.entities[i].velX + this.entities[i].accX;
            let newVelY = this.entities[i].velY + this.entities[i].accY;
            let newPosX = Math.round(this.entities[i].posX + newVelX);
            let newPosY = Math.round(this.entities[i].posY + newVelY);

            // Se existe uma partícula entre a posição antiga e a nova posição, teleportar para cima dela
            let result = this.checkBetween(newPosX, this.entities[i].posY, newPosY);
            if (result != false) {
                this.matrix[this.entities[i].posY][this.entities[i].posX] = 0;
                this.entities[i].posY = result - 1;
                this.matrix[this.entities[i].posY][this.entities[i].posX] = 1;
            } else {
                // Se for atravessar o chão, não mexer
                if (newPosY >= height) {
                    this.matrix[this.entities[i].posY][this.entities[i].posX] = 0;
                    this.entities[i].posY = height - 1;
                    this.matrix[this.entities[i].posY][this.entities[i].posX] = 1;
                } else {
                    // Senão, prosseguir normalmente
                    this.matrix[this.entities[i].posY][this.entities[i].posX] = 0;

                    this.entities[i].velX = newVelX;
                    this.entities[i].velY = newVelY;
                    this.entities[i].posX = newPosX;
                    this.entities[i].posY = newPosY;

                    this.matrix[newPosY][newPosX] = 1;
                }
            }


        }
    }

    addEntity(posX, posY, velX, velY, accX, accY, brushSize) {
        for (let x = posX - 1 - brushSize; x <= posX - 1 + brushSize; x++) {
            for (let y = posY - 1 - brushSize; y <= posY - 1 + brushSize; y++) {
                if (this.matrix[y][x] == 0) {
                    this.entities.push(new Entity(x, y, velX, velY, accX, accY));
                    this.matrix[y][x] = 1;
                }
            }
        }

        // if (this.matrix[posY - 1][posX - 1] == 0 || this.matrix[posY - 1][posX - 1] == undefined) {
        //     this.entities.push(new Entity(posX, posY, velX, velY, accX, accY));
        //     this.matrix[posY][posX] = 1;
        // }
    }

    checkBetween(x, oldY, newY) {
        if (newY >= height) {
            newY = height - 1;
        }
        for (let i = oldY + 1; i <= newY; i++) {
            if (this.matrix[i][x] != 0) {
                return i;
            }
        }
        return false;
    }
}