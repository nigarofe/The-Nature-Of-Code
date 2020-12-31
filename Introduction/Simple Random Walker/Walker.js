class Walker {
    constructor() {
        this.x = width / 2;
        this.y = height / 2;
        this.width = 21;
        this.height = 21;
        this.stepSize = 5;
    }

    show() {
        fill(255, 10);
        stroke(255, 10);
        ellipse(this.x, this.y, this.width, this.height);
    }

    move() {
        let choice = Math.random() * 4;
        choice = Math.floor(choice);

        switch (choice) {
            case 0:
                this.goForward();
                break;
            case 1:
                this.goBackward();
                break;
            case 2:
                this.goLeft();
                break;
            case 3:
                this.goRight();
                break;
            default:

        }
    }

    goForward() {
        this.y -= this.stepSize;
    }
    goBackward() {
        this.y += this.stepSize;
    }
    goLeft() {
        this.x -= this.stepSize;
    }
    goRight() {
        this.x += this.stepSize;
    }
}