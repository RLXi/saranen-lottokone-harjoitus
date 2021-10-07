// Lotto

let lottoNumbers = Array.from({ length: 40 }, (_, i) => i + 1); // should remain untouched
let tempArr = []; // copy of lottoNumbers. this can be altered
let drawnLots = [];
let numberofAttempts = 0;

function init() {
    tempArr = [...lottoNumbers];
    numberOfAttempts = 0;
}
