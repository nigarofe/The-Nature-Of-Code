// Observations
// init weights and biases with 0;
// in mutate, add random(-1, 1). Not just pick new values
// activation function

let mutationRate = 0.01;
let weightsLearningRate = 1;
let biasLearningRate = 2

class Neuron {
    constructor(weightsQuantity) {
        // this.weights = fillWithZeros(weightsQuantity);
        this.weights = randomArray(weightsQuantity, weightsLearningRate, false);
        this.bias = random(-biasLearningRate, biasLearningRate);
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
                // newNeuron.weights[i] = neuron.weights[i] + random(-weightsLearningRate, weightsLearningRate);
                newNeuron.weights[i] = random(-weightsLearningRate, weightsLearningRate);
            } else {
                newNeuron.weights[i] = neuron.weights[i];
            }
        }
        if (Math.random() < mutationRate) {
            // newNeuron.bias = neuron.bias + random(-biasLearningRate, biasLearningRate);
            newNeuron.bias = random(-biasLearningRate, biasLearningRate);
        } else {
            newNeuron.bias = neuron.bias;
        }
        return newNeuron;
    }
}

function activate(x) {
    // // ELU
    if (x > -100) {
        return x;
    } else {
        return 0;
    }
}

function randomArray(size, interval, isInteger) {
    let newArray = new Array();
    for (let i = 0; i < size; i++) {
        if (isInteger) {
            newArray.push(Math.floor(random(-interval, interval)));
        } else {
            newArray.push(random(-interval, interval));
        }
    }
    return newArray;
}

function fillWithZeros(size) {
    let newArray = new Array();
    for (let i = 0; i < size; i++) {
        newArray[i] = 0;
    }
    return newArray;
}