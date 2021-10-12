// Lotto
console.time("runtime");

const { fork } = require("child_process");
const { generateRandomUniqueNumbers, simpleSort } = require("./utils.js");

let minimumCorrect = 7;

function init(minCorrect = 7) {
    minimumCorrect = minCorrect;
}

function validateArgs(args) {
    if (args[0].toLowerCase() === "random") return generateRandomUniqueNumbers();

    const nums = new Set(args); // Set allows only unique values.
    if (nums.size !== 7) throw `expected 7 different numbers, got ${nums.size}`;

    const validNumbers = [];
    const arr = Array.from(nums);

    for (let i = 0; i < arr.length; i++) {
        const num = parseInt(arr[i]);

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

function play(payload) {
    const frames = ["🌑 ", "🌒 ", "🌓 ", "🌔 ", "🌕 ", "🌖 ", "🌗 ", "🌘 "];
    let x = 0;
    process.stdout.write("\x1b[?25l"); // remove cursor

    // play loader animation while waiting for jackpot
    const loader = setInterval(() => {
        process.stdout.write("\r" + frames[x++]);
        x %= frames.length;
    }, 80);

    function resolve(data) {
        process.stdout.write("\r\x1b[?25h"); // restore cursor
        clearInterval(loader);
        return data;
    }    

    return new Promise(res => {
        const childProcess = fork("./machine.js");
        childProcess.send(payload);
    
        childProcess.on("message", data => {
            res(resolve(data));
        });
    });
}

function logResults(data) {
    console.log("--- Results ---");
    for (numsCorrect in data) {
        if (numsCorrect === 'misc') continue;
        console.log('Tier:', numsCorrect, 'correct');
        console.log('Attempt number:', data[numsCorrect].attemptNum);
        console.log('Time in years:', data[numsCorrect].numYears);
        console.log('First drawn numbers:', data[numsCorrect].drawnNumbers);
        console.log('First correct number(s):', data[numsCorrect].correctNumbers);
        console.log('Total hits:', data[numsCorrect].ding);
        console.log();
    }
    console.log("--- Miscellaneous information ---");
    console.log('No hits:', data.misc.numOfNoHits);
    console.log('Total attempts:', data.misc.numberOfAttempts);
}

async function main() {
    init();

    const args = process.argv.slice(2, 9); // Slice to only relevant arguments
    const validatedNumbers = validation(args);
    if (!validatedNumbers) return;

    validatedNumbers.sort(simpleSort);
    console.log("my numbers:", validatedNumbers, "\n");

    const timeline = await play({ numbers: validatedNumbers, minimumCorrect });
    logResults(timeline);
}

main().then(() => {
    console.log("\ndone")
    console.timeEnd("runtime");
});
