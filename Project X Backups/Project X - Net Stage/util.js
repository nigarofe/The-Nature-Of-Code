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