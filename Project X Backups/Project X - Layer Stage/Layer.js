class Layer {
    constructor(neuronsQuantity, weightsQuantityPerNeuron) {
        this.neurons = new Array();
        for (let i = 0; i < neuronsQuantity; i++) {
            // this.neurons[i] = new Neuron(weightsQuantityPerNeuron);
            this.neurons[i] = Neuron.getMutation(new Neuron(weightsQuantityPerNeuron));
        }

        this.weightsQuantityPerNeuron = weightsQuantityPerNeuron;
    }

    calculate(inputArray) {
        if (inputArray.length == this.weightsQuantityPerNeuron) {
            let output = new Array(this.neurons.length);
            for (let i = 0; i < this.neurons.length; i++) {
                output[i] = this.neurons[i].calculate(inputArray);
            }
            return output;
        } else {
            console.error("inputArray.length != this.weightsQuantityPerNeuron");
        }
    }
}