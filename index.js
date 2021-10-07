// Lotto

let lottoNumbers = Array.from({ length: 40 }, (_, i) => i + 1); // should remain untouched
let tempArr = []; // copy of lottoNumbers. this can be altered
let drawnLots = [];
let numberOfAttempts = 0;
let highScore = 0;

function init() {
    numberOfAttempts = 0;
}

function validateArgs(args) {
    const len = args.length;
    const validNumbers = [];

    if (args[2] === "random") {
        return drawLots(lottoNumbers);
    }

    for (let i = 2; i < len; i++) {
        let num = parseInt(args[i]);
        if (isNaN(num) || num < 1 || num > 40 || validNumbers.includes(num))
            throw `invalid argument: ${args[i]}`;

        validNumbers.push(num);
    }

    return validNumbers;
}

function drawLots(arr) {
    tempArr = [...arr];
    let len = 0;
    drawnLots = [];
    do {
        len = tempArr.length;
        let randomNumber = Math.floor(Math.random() * len + 1);
        drawnLots.push(...tempArr.splice(randomNumber, 1));
    } while (drawnLots.length != 7);
    return drawnLots;
}

function startLotto(args) {
    init();
    let lots = [];
    let correctLots = [];
    try {
        lots = validateArgs(args);
    } catch (e) {
        console.log(e);
        return;
    }

    let correctLotsLength = correctLots.length;
    while (correctLotsLength < 7) {
        correctLots = [];
        let drawnLotsTemp = drawLots(lottoNumbers);
        //console.log(drawnLotsTemp);
        lots.forEach((lot) => {
            if (drawnLotsTemp.includes(lot) && !correctLots.includes(lot))
                correctLots.push(lot);
        });
        correctLotsLength = correctLots.length;
        numberOfAttempts++;
    }

    console.log("my numbers:", lots);
    console.log("drawn numbers:", drawnLots);
    console.log("correct numbers:", correctLots);
    console.log(`You got ${correctLotsLength} right!`);
    console.log(`It only took ${numberOfAttempts} attempts!`);
}

startLotto(process.argv);
