class Network {
    // 4, [2, 4, 3, 2]
    constructor(layersQuantity, structure) {
        if (layersQuantity == structure.length) {
            this.layers = new Array(layersQuantity);
            this.structure = structure;
            // 1, 2, 3
            for (let i = 1; i < layersQuantity; i++) {
                // 4, 2    3, 4    2, 3
                this.layers[i] = new Layer(structure[i], structure[i - 1]);
            }
        } else {
            console.error("layersQuantity != structure.length");
        }
    }

    calculate(inputArray) {
        if (inputArray.length == this.structure[0]) {
            let lastLayerResult = this.layers[1].calculate(inputArray);
            for (let i = 2; i < this.structure.length; i++) {
                lastLayerResult = this.layers[i].calculate(lastLayerResult);
            }
            return lastLayerResult;
        } else {
            console.error("inputArray.length != this.structure[0]");
        }
    }

    static getMutation(network) {
        let newNetwork = new Network(network.layers.length, network.structure);
        for (let i = 1; i < network.layers.length; i++) {
            newNetwork.layers[i] = Layer.getMutation(network.layers[i]);
        }
        return newNetwork;
    }

    static calculateNetworkError(network, answerArray) {
        let error = 0;

        for (let x = 0; x < answerArray.length; x++) {
            let y = network.calculate([x]);
            if (answer[x] - y < 0) {
                error += -1 * (answerArray[x] - y);
            } else {
                error += answerArray[x] - y;
            }
        }
        return error;
    }
}