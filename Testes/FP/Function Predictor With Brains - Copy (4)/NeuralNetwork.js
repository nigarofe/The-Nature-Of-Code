let intervalo = 2;
let mutationRate = 0.05;

class NeuralNetwork {
    // 5, 4
    constructor(layersQuantity, networkHeight) {
        // 5
        this.w = new Array(layersQuantity);
        this.b = new Array(layersQuantity);
        // 1
        this.w[1] = new Array(networkHeight);
        this.b[1] = new Array(networkHeight);
        // 2, 3
        for (let i = 2; i < layersQuantity - 1; i++) {
            this.w[i] = new Array(networkHeight);
            for (let j = 0; j < networkHeight; j++) {
                this.w[i][j] = new Array(networkHeight);
            }
        }
        for (let i = 2; i < layersQuantity - 1; i++) {
            this.b[i] = new Array(networkHeight);
            for (let j = 0; j < networkHeight; j++) {
                this.b[i][j] = new Array(networkHeight);
            }
        }
        // 4
        this.w[layersQuantity - 1] = new Array(networkHeight);
        this.b[layersQuantity - 1] = new Array(networkHeight);

        this.layersQuantity = layersQuantity;
        this.networkHeight = networkHeight;
        this.initWeights();
        this.initBiases();
        this.threshold = random(intervalo * 100);

        this.answers = new Array(width);
    }

    initWeights() {
        // 1
        for (let i = 0; i < this.networkHeight; i++) {
            this.w[1][i] = random(-intervalo, intervalo);
            // this.w[1][i] = Math.round(random(-intervalo, intervalo));
        }

        // 2, 3
        for (let i = 2; i < this.layersQuantity - 1; i++) {
            for (let j = 0; j < this.w[i].length; j++) {
                for (let k = 0; k < this.networkHeight; k++) {
                    this.w[i][j][k] = random(-intervalo, intervalo);
                    // this.w[i][j][k] = Math.round(random(-intervalo, intervalo));
                }
            }
        }

        // 4
        for (let i = 0; i < this.networkHeight; i++) {
            this.w[this.layersQuantity - 1][i] = random(-intervalo, intervalo);
            // this.w[this.layersQuantity - 1][i] = Math.round(random(-intervalo, intervalo));
        }
    }

    initBiases() {
        // 1
        for (let i = 0; i < this.networkHeight; i++) {
            this.b[1][i] = random(-intervalo * 10, intervalo * 10);
            // this.b[1][i] = Math.round(random(-intervalo, intervalo));
        }

        // 2, 3
        for (let i = 2; i < this.layersQuantity - 1; i++) {
            for (let j = 0; j < this.b[i].length; j++) {
                for (let k = 0; k < this.networkHeight; k++) {
                    this.b[i][j][k] = random(-intervalo * 10, intervalo * 10);
                    // this.b[i][j][k] = Math.round(random(-intervalo, intervalo));
                }
            }
        }

        // 4
        for (let i = 0; i < this.networkHeight; i++) {
            this.b[this.layersQuantity - 1][i] = random(-intervalo * 10, intervalo * 10);
            // this.b[this.layersQuantity - 1][i] = Math.round(random(-intervalo, intervalo));
        }
    }

    feedForward(x) {
        let layer1results = new Array(this.networkHeight);
        // 1
        for (let i = 0; i < this.networkHeight; i++) {
            layer1results[i] = x * this.w[1][i] + this.b[1][i];
        }
        // 2, 3
        let oldLayerResults = new Array(this.networkHeight);
        for (let k = 2; k < this.layersQuantity - 1; k++) {
            if (k == 2) {
                oldLayerResults = layer1results;
            }

            let newLayerResults = new Array(this.networkHeight);
            for (let i = 0; i < this.networkHeight; i++) {
                newLayerResults[i] = 0;
            }


            for (let i = 0; i < this.networkHeight; i++) {
                for (let j = 0; j < this.networkHeight; j++) {
                    // console.log(newLayerResults[i] + " += " + this.w[k][i][j] + " * " + layer1results[j] + " = " + this.w[k][i][j] * layer1results[j]);
                    newLayerResults[i] += this.w[k][i][j] * layer1results[j] + this.b[k][i][j];
                }
                if (newLayerResults[i] < this.threshold) {
                    newLayerResults[i] = 0;
                }
            }
            oldLayerResults = newLayerResults;
        }

        // let layer2results = new Array(this.networkHeight);
        // for (let i = 0; i < this.networkHeight; i++) {
        //     layer2results[i] = 0;
        // }
        // for (let i = 0; i < this.networkHeight; i++) {
        //     for (let j = 0; j < this.networkHeight; j++) {
        //         layer2results[i] += this.w[2][i][j] * layer1results[j];
        //     }
        // }

        // 4
        let y = 0;
        for (let i = 0; i < this.networkHeight; i++) {
            y += this.w[this.layersQuantity - 1][i] * oldLayerResults[i] + this.b[this.layersQuantity - 1][i];
        }

        return y;
    }

    think() {
        for (let x = 0; x < width; x++) {
            this.answers[x] = this.feedForward(x);
        }
    }

    draw() {
        noFill();
        stroke(0, 255, 255);
        beginShape();
        for (let x = 0; x < width; x++) {
            vertex(x, this.answers[x]);
        }
        endShape();
    }

    mutateWeights() {
        // 1
        for (let i = 0; i < this.networkHeight; i++) {
            if (Math.random() < mutationRate) {
                this.w[1][i] = random(-intervalo, intervalo);
            }
        }

        // 2, 3
        for (let i = 2; i < this.layersQuantity - 1; i++) {
            for (let j = 0; j < this.w[i].length; j++) {
                for (let k = 0; k < this.networkHeight; k++) {
                    if (Math.random() < mutationRate) {
                        this.w[i][j][k] = random(-intervalo, intervalo);
                    }
                }
            }
        }

        // 4
        for (let i = 0; i < this.networkHeight; i++) {
            if (Math.random() < mutationRate) {
                this.w[this.layersQuantity - 1][i] = random(-intervalo, intervalo);
            }
        }
    }

    mutateBiases() {
        // 1
        for (let i = 0; i < this.networkHeight; i++) {
            if (Math.random() < mutationRate) {
                this.b[1][i] = random(-intervalo, intervalo);
            }
        }

        // 2, 3
        for (let i = 2; i < this.layersQuantity - 1; i++) {
            for (let j = 0; j < this.b[i].length; j++) {
                for (let k = 0; k < this.networkHeight; k++) {
                    if (Math.random() < mutationRate) {
                        this.b[i][j][k] = random(-intervalo, intervalo);
                    }
                }
            }
        }

        // 4
        for (let i = 0; i < this.networkHeight; i++) {
            if (Math.random() < mutationRate) {
                this.b[this.layersQuantity - 1][i] = random(-intervalo, intervalo);
            }
        }
    }
    mutateThreshold() {
        this.threshold = random(intervalo * 100);
    }
}





















// class NeuralNetwork {
//     // 5, 4
//     constructor(layersQuantity, networkHeight) {
//         // 5
//         this.w = new Array(layersQuantity);
//         // 1
//         this.w[1] = new Array(networkHeight);
//         // 2, 3
//         for (let i = 2; i < layersQuantity - 1; i++) {
//             this.w[i] = new Array(networkHeight);
//         }
//         // 4
//         this.w[layersQuantity - 1] = new Array(networkHeight);

//         this.layersQuantity = layersQuantity;
//         this.networkHeight = networkHeight;
//         this.initWeights();
//     }

//     initWeights() {
//         // 1
//         for (let i = 0; i < this.networkHeight; i++) {
//             this.w[1][i] = random(-0.5, 0.5);
//         }

//         // 2, 3
//         for (let i = 2; i < this.layersQuantity - 1; i++) {
//             // this.w[i] = new Array(networkHeight);
//             for (let j = 0; j < this.w[i].length; j++) {
//                 this.w[i][j] = random(-0.5, 0.5);
//             }
//         }

//         // 4
//         for (let i = 0; i < this.networkHeight; i++) {
//             this.w[this.layersQuantity - 1][i] = random(-0.5, 0.5);
//         }
//     }
// }