// Observations
// init weights and biases with 0;
// in mutate, add random(-1, 1). Not just pick new values
// activation function

let mutationRate = 0.05;
let learningRate = 2;

class Neuron {
    constructor(weightsQuantity) {
        this.weights = fillWithZeros(weightsQuantity);
        // this.weights = randomArray(weightsQuantity, -10, 10, true);
        this.bias = 0;
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

    static getMutation(neuron) {
        let newNeuron = new Neuron(neuron.weights.length);
        for (let i = 0; i < neuron.weights.length; i++) {
            if (Math.random() < mutationRate) {
                newNeuron.weights[i] = neuron.weights[i] + random(-learningRate, learningRate);
            } else {
                newNeuron.weights[i] = neuron.weights[i];
            }
        }
        if (Math.random() < mutationRate) {
            newNeuron.bias = neuron.bias + random(-learningRate * 1, learningRate * 1);
        } else {
            newNeuron.bias = neuron.bias;
        }
        return newNeuron;
    }
}

function activate(x) {
    if (x > 0) {
        return x;
    } else {
        return 0;
    }
}