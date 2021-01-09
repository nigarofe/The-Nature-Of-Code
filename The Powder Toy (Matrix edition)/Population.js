function drawOptimizationRectangles() {
    for (let i = 0; i < optimizationRectangles.length; i++) {
        if (optimizationVisible) {
            stroke(random(255));
            strokeWeight(1);
        }
        fill(255)
        rect(optimizationRectangles[i][0], optimizationRectangles[i][1], inc, inc);
    }
    // inc = Math.round(optimizationRectangles.length);
}


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
            if (isDrawing) {
                this.entities[i].draw();
            }

            this.entities[i].active = this.checkSides(i);

            if (this.entities[i].active) {
                this.entities[i].needToDraw = true;
                let newVelX = this.entities[i].velX + this.entities[i].accX;
                let newVelY = this.entities[i].velY + this.entities[i].accY;
                let newPosX = Math.round(this.entities[i].posX + newVelX);
                let newPosY = Math.round(this.entities[i].posY + newVelY);

                // Se existe uma partícula entre a posição antiga e a nova posição, teleportar para cima dela

                let resultBaixo = this.checkBetweenDown(newPosX, this.entities[i].posY, newPosY);
                let resultCima = this.checkBetweenUp(newPosX, this.entities[i].posY, newPosY);

                if (resultBaixo != -1) {
                    // Olhando para baixo
                    this.matrix[this.entities[i].posY][this.entities[i].posX] = 0;
                    this.entities[i].posY = resultBaixo - 1;
                    this.matrix[this.entities[i].posY][this.entities[i].posX] = 1;
                } else if (resultCima != -1) {
                    // Olhando para cima
                    this.matrix[this.entities[i].posY][this.entities[i].posX] = 0;
                    this.entities[i].posY = resultCima + 1;
                    this.matrix[this.entities[i].posY][this.entities[i].posX] = 1;
                } else {
                    // Se for atravessar o chão, não mexer
                    if (newPosY >= height) {
                        this.matrix[this.entities[i].posY][this.entities[i].posX] = 0;
                        this.entities[i].posY = height - 1;
                        this.matrix[this.entities[i].posY][this.entities[i].posX] = 1;

                        // Se for atravessar o teto, não mexer
                    } else if (newPosY < 0) {
                        this.matrix[this.entities[i].posY][this.entities[i].posX] = 0;
                        this.entities[i].posY = 0;
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
        // if (frameCount % 30 == 0) {
        //     this.optimizeGraphics();
        // }
    }

    checkBetweenDown(x, oldY, newY) {
        if (newY >= height) {
            newY = height - 1;
        }
        for (let i = oldY + 1; i <= newY; i++) {
            if (this.matrix[i][x] != 0) {
                return i;
            }
        }
        return -1;
    }

    checkBetweenUp(x, oldY, newY) {
        if (newY < 0) {
            newY = 0
        }
        for (let i = oldY - 1; i >= newY; i--) {
            if (this.matrix[i][x] != 0) {
                return i;
            }
        }
        return -1;
    }

    checkSides(i) {

        // Cuidado com a borda de cima
        if (this.entities[i].posY - 1 >= 0) {
            //Parte de cima
            if (this.matrix[this.entities[i].posY - 1][this.entities[i].posX] != 1) {
                return true;
            }
        }

        // Cuidado com a borda de baixo
        if (this.entities[i].posY + 1 < height) {
            // Parte de baixo
            if (this.matrix[this.entities[i].posY + 1][this.entities[i].posX] != 1) {
                return true;
            }
        }

        // Parte da direita
        if (this.matrix[this.entities[i].posY][this.entities[i].posX + 1] != 1 || this.matrix[this.entities[i].posY][this.entities[i].posX + 2] != 1) {
            return true;
        }

        // Parte da esquerda
        if (this.matrix[this.entities[i].posY][this.entities[i].posX - 1] != 1 || this.matrix[this.entities[i].posY][this.entities[i].posX - 2] != 1) {
            return true;
        }
        return false;
    }

    optimizeGraphics() {
        optimizationRectangles = new Array();
        // console.log(this.matrix.length + " - " + height)
        // console.log(this.matrix[0].length + " - " + width)

        for (let i = 0; i < width - 1; i += inc) {
            for (let j = 0; j < height - 1; j += inc) {
                // fill(random(255, 0))
                // rect(i, j, i + inc, j + inc)

                let thereIsADiferent = false;
                for (let k = i; k < i + inc; k++) {
                    for (let l = j; l < j + inc; l++) {
                        // console.log("k = " + k + "; l =" + l)
                        if (l < height && k < width && this.matrix[l][k] != 1) {
                            thereIsADiferent = true;
                            break;
                        }
                    }
                }

                if (thereIsADiferent) {
                    fill(255, 0, 0, 10);
                    // rect(i, j, i + inc, j + inc)
                } else {


                    for (let k = i; k < i + inc; k++) {
                        for (let l = j; l < j + inc; l++) {
                            // console.log("k = " + k + "; l =" + l)
                            if (l < height && k < width) {
                                // this.matrix[l][k]
                                for (let m = 0; m < this.entities.length; m++) {
                                    if (this.entities[m].posX == k && this.entities[m].posY === l) {
                                        this.entities[m].needToDraw = false;
                                    }
                                }

                            }
                        }
                    }

                    // fill(255, 255, 0);
                    // rect(i, j, inc, inc)
                    let coords = new Array();
                    coords.push(i);
                    coords.push(j);
                    optimizationRectangles.push(coords)
                }
            }
        }
        //pause = true;
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

}