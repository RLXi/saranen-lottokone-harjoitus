// Lotto

let lottoNumbers = Array.from({ length: 40 }, (_, i) => i + 1); // should remain untouched
let tempArr = []; // copy of lottoNumbers. this can be altered
let drawnLots = [];
let numberOfAttempts = 0;
let highScore = 0;
let highScoreAttempts = 0;

function init() {
    numberOfAttempts = 0;
}

function validateArgs(args) {
    const len = args.length;
    const validNumbers = [];

    if (args[2] === "random") return drawLots(lottoNumbers);

    if (len < 9 || len > 9) throw `expected 7 numbers, got ${len - 2}`;

    for (let i = 2; i < len; i++) {
        let num = parseInt(args[i]);
        if (isNaN(num) || num < 1 || num > 40 || validNumbers.includes(num))
            throw `invalid argument: ${args[i]}. Make sure all the numbers are different.`;

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

const simpleSort = (a, b) => a - b;

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
        lots.forEach((lot) => {
            if (drawnLotsTemp.includes(lot) && !correctLots.includes(lot))
                correctLots.push(lot);
        });
        correctLotsLength = correctLots.length;
        numberOfAttempts++;
        if (correctLotsLength > highScore) highScore = correctLotsLength;
    }

    lots.sort(simpleSort);
    drawnLots.sort(simpleSort);
    correctLots.sort(simpleSort);
    console.log("my numbers:", lots);
    console.log("drawn numbers:", drawnLots);
    console.log("correct numbers:", correctLots);
    console.log(`You got ${correctLotsLength} correct!`);
    console.log(
        `It only took ${numberOfAttempts} attempts! Or ${parseFloat(
            numberOfAttempts / 52
        ).toFixed(2)} years!`
    );
}

startLotto(process.argv);
