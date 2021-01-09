class Neuron {
    constructor(weightsQuantity) {
        this.weights = fillWithZeros(weightsQuantity);
        // this.weights = randomArray(weightsQuantity, -10, 10, true);
        this.bias = 1;
    }

    calculate(inputArray) {
        if (inputArray.length == this.weights.length) {
            let output = 0;
            for (let i = 0; i < this.weights.length; i++) {
                output += this.weights[i] * inputArray[i];
            }
            output += this.bias;
            return activate(output);
        } else {
            console.error("inputArray.length != this.weights.length")
        }
    }
}

function activate(x) {
    // // ELU
    // return Math.log(1 + Math.pow(Math.E, x));
    if (x > -100) {
        return x;
    } else {
        return -100;
    }
}