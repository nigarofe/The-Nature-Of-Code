class NeuralNetwork {
    constructor(l1w, l2w) {
        this.l1w = l1w;
        this.l1r = new Array(l1w.length);

        this.l2w = l2w;
        // this.l2r = new Array(l2w.length); // outputvalue
    }

    feedForward(inputValue) {
        this.l1r = new Array(this.l1w.length);

        for (let i = 0; i < this.l1r.length; i++) {
            this.l1r[i] = this.l1w[i] * inputValue;

        }

        let outputValue = 0;
        for (let i = 0; i < this.l2w.length; i++) {
            // console.log(this.l1r[i])
            // console.log(this.l2w[i])
            outputValue += this.l1r[i] * this.l2w[i];
        }

        return outputValue;
    }
}