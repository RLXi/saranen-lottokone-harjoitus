// Lotto
console.time("runtime");

let drawnNumbers = [];
let numberOfAttempts = 0;
let highScore = 0;
let highScoreAttempts = 0;

const simpleSort = (a, b) => a - b;

function init() {
    numberOfAttempts = 0;
    highScore = 0;
    highScoreAttempts = 0;
}

function generateRandomUniqueNumbers(min = 1, max = 40) {
    const drawnNumbersSet = new Set();
    do {
        drawnNumbersSet.add(Math.floor(Math.random() * max + min));
    } while (drawnNumbersSet.size !== 7);
    return Array.from(drawnNumbersSet);
}

function play(myNumbers, minimumCorrect = 7) {
    let correctNumbers = [];
    let correctNumbersLength = correctNumbers.length;

    while (correctNumbersLength < minimumCorrect) {
        correctNumbers = [];
        drawnNumbers = generateRandomUniqueNumbers();

        myNumbers.forEach((num) => {
            if (drawnNumbers.includes(num) && !correctNumbers.includes(num))
                correctNumbers.push(num);
        });

        correctNumbersLength = correctNumbers.length;
        numberOfAttempts++;
        if (correctNumbersLength > highScore) highScore = correctNumbersLength;
    }
    return correctNumbers;
}

function validateArgs(args) {
    if (args[0] === "random") return generateRandomUniqueNumbers();

    const nums = new Set(args); // Set allows only unique values.
    if (nums.size !== 7) throw `expected 7 different numbers, got ${nums.size}`;

    const validNumbers = [];
    const arr = Array.from(nums);

    for (let i = 0; i < arr.length; i++) {
        let num = parseInt(arr[i]);

        if (isNaN(num) || num < 1 || num > 40 || validNumbers.includes(num))
            throw `invalid argument: ${arr[i]}. Make sure all arguments are different numbers between 1 and 40, inclusive.`;
        validNumbers.push(num);
    }
    return validNumbers;
}

function validation(args) {
    let numbers = [];
    try {
        numbers = validateArgs(args);
    } catch (e) {
        console.log(e);
        return;
    }
    return numbers;
}

function main() {
    init();

    const args = process.argv.slice(2, 9); // Slice to only relevant arguments
    const validatedNumbers = validation(args);
    if (!validatedNumbers) return;

    validatedNumbers.sort(simpleSort);
    console.log("my numbers:", validatedNumbers);

    const correctNumbers = play(validatedNumbers);
    correctNumbers.sort(simpleSort);

    drawnNumbers.sort(simpleSort);
    console.log("drawn numbers:", drawnNumbers);
    console.log("correct numbers:", correctNumbers);
    console.log(`You got ${correctNumbers.length} correct!`);
    console.log(
        `It only took ${numberOfAttempts} attempts! Or ${parseFloat(
            numberOfAttempts / 52
        ).toFixed(2)} years!`
    );
}

main();

console.timeEnd("runtime");
