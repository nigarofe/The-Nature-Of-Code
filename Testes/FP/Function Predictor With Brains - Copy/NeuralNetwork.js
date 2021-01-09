let intervalo = 10;

class NeuralNetwork {
    // 5, 4
    constructor(layersQuantity, networkHeight) {
        // 5
        this.w = new Array(layersQuantity);
        // 1
        this.w[1] = new Array(networkHeight);
        // 2, 3
        for (let i = 2; i < layersQuantity - 1; i++) {
            this.w[i] = new Array(networkHeight);
            for (let j = 0; j < networkHeight; j++) {
                this.w[i][j] = new Array(networkHeight);
            }
        }
        // 4
        this.w[layersQuantity - 1] = new Array(networkHeight);

        this.layersQuantity = layersQuantity;
        this.networkHeight = networkHeight;
        this.initWeights();
    }

    initWeights() {
        // 1
        for (let i = 0; i < this.networkHeight; i++) {
            // this.w[1][i] = random(-intervalo, intervalo);
            this.w[1][i] = Math.round(random(-intervalo, intervalo));
        }

        // 2, 3
        for (let i = 2; i < this.layersQuantity - 1; i++) {
            for (let j = 0; j < this.w[i].length; j++) {
                for (let k = 0; k < this.networkHeight; k++) {
                    // this.w[i][j][k] = random(-intervalo, intervalo);
                    this.w[i][j][k] = Math.round(random(-intervalo, intervalo));
                }
            }
        }

        // 4
        for (let i = 0; i < this.networkHeight; i++) {
            // this.w[this.layersQuantity - 1][i] = random(-intervalo, intervalo);
            this.w[this.layersQuantity - 1][i] = Math.round(random(-intervalo, intervalo));
        }
    }

    feedForward(x) {
        let layer1results = new Array(this.networkHeight);
        // 1
        for (let i = 0; i < this.networkHeight; i++) {
            layer1results[i] = x * this.w[1][i];
        }
        // 2
        let layer2results = new Array(this.networkHeight);
        for (let i = 0; i < this.networkHeight; i++) {
            layer2results[i] = 0;
        }
        for (let i = 0; i < this.networkHeight; i++) {
            for (let j = 0; j < this.networkHeight; j++) {
                layer2results[i] += this.w[2][i][j] * layer1results[j];
            }
        }

        // 3 (not draw example)
        let y = 0;
        for (let i = 0; i < this.networkHeight; i++) {
            // console.log("this.w[this.layersQuantity - 1][i] * layer2results[i] = " + this.w[this.layersQuantity - 1][i] + " * " + layer2results[i] + " = " + this.w[this.layersQuantity - 1][i] * layer2results[i])
            y += this.w[this.layersQuantity - 1][i] * layer2results[i];
        }

        console.table(layer1results);
        console.table(layer2results);
        console.log(y);
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