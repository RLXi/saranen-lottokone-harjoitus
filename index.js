// Lotto

let lottoNumbers = Array.from({ length: 40 }, (_, i) => i + 1); // should remain untouched
let tempArr = []; // copy of lottoNumbers. this can be altered
let drawnLots = [];
let numberofAttempts = 0;

function init() {
    tempArr = [...lottoNumbers];
    numberOfAttempts = 0;
}

function validateArgs(args) {
    const len = args.length;
    const validNumbers = [];
    for (let i = 2; i < len; i++) {
        let num = parseInt(args[i]);
        if (isNaN(num) || num < 1 || num > 40 || validNumbers.includes(num))
            throw `invalid argument: ${args[i]}`;

        validNumbers.push(num);
    }

    return validNumbers;
}

function drawLots(arr) {
    const len = arr.length;
    for (let lot = 2; lot < len - 1; lot++) {
        console.log(lot);
    }
}

function startLotto(args) {
    let lots = [];

    init();

    try {
        lots = validateArgs(args);
    } catch (e) {
        console.log(e);
    }

    drawnLots = drawLots(lottoNumbers);
}

startLotto(process.argv);
