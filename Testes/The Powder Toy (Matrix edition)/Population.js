let time = 0;

class Population {
    constructor() {

        this.entities = new Array(1000);



        // let t0 = performance.now();
        // for (let i = 0; i < this.entities.length; i++) {
        //     this.entities[i] = new Array(1000);
        // }
        // time += performance.now() - t0;






        let t0 = performance.now();
        let i = 0;
        while (i < this.entities.length) {
            this.entities[i] = new Array(1000);
            i++;
        }

        time += performance.now() - t0;














        // let t0 = performance.now();

        // for (let j = 0; j < this.entities.length; j++) {
        //     for (let k = 0; k < this.entities[j].length; k++) {
        //         if (this.entities[j][k] == 1) {

        //         } else if (this.entities[j][k] == 1) {

        //         } else if (this.entities[j][k] != 1) {
        //             this.entities[j][k] = 123;
        //             this.entities[j][k] = Math.pow(this.entities[j][k], 5)
        //         }
        //     }
        // }
        // time += performance.now() - t0;



        // let j = 0,
        //     k = 0;
        // while (j < this.entities.length) {
        //     while (k < this.entities.length) {
        //         if (this.entities[j][k] == 1) {

        //         } else if (this.entities[j][k] == 1) {

        //         } else if (this.entities[j][k] != 1) {
        //             this.entities[j][k] = 123;
        //             this.entities[j][k] = Math.pow(this.entities[j][k], 5)
        //         }
        //         k++;
        //     }
        //     j++;
        // }

        // time += performance.now() - t0;




        // let j = this.entities.length - 1,
        //     k = this.entities.length - 1;
        // while (j >= 0) {
        //     while (k >= 0) {
        //         if (this.entities[j][k] == 1) {

        //         } else if (this.entities[j][k] == 1) {

        //         } else if (this.entities[j][k] != 1) {
        //             this.entities[j][k] = 123;
        //             this.entities[j][k] = Math.pow(this.entities[j][k], 5)
        //         }
        //         k--;
        //     }
        //     j--;
        // }

        // time += performance.now() - t0;
    }
}