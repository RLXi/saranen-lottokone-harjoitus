const { generateRandomUniqueNumbers, simpleSort } = require("./utils.js");

process.on("message", payload => {
    const { numbers, minimumCorrect } = payload;
    const res = play(numbers, minimumCorrect);

    process.send(res);
    process.exit();
});

/**
 * 
 * @param {number[]} myNumbers 
 * @param {number} minimumCorrect 
 * @returns {Object}
 */
function play(myNumbers, minimumCorrect = 7) {
    let numberOfAttempts = 0;
    let correctNumbersLength = 0;
    let numOfNoHits = 0;
    const data = {};

    while (correctNumbersLength < minimumCorrect) {
        const drawnNumbers = generateRandomUniqueNumbers();
        numberOfAttempts++;

        myNumbers.forEach(row => {
            if (correctNumbersLength === minimumCorrect) return;
            const correctNumbers = new Set();
        
            row.forEach((num) => {
                if (drawnNumbers.includes(num)) correctNumbers.add(num);
            });
            correctNumbersLength = correctNumbers.size;
            
            if (correctNumbersLength > 0) {
                if (!data.hasOwnProperty(correctNumbersLength)) {
                    data[correctNumbersLength] = {
                        attemptNum: numberOfAttempts,
                        drawnNumbers: drawnNumbers.sort(simpleSort),
                        correctNumbers: Array.from(correctNumbers).sort(simpleSort),
                        numYears: parseFloat(numberOfAttempts / 52).toFixed(2),
                        ding: 1
                    };
                } else {
                    data[correctNumbersLength].ding = data[correctNumbersLength].ding += 1;
                }
            }
            else numOfNoHits++;
        });
    }

    data.misc = {numberOfAttempts, numOfNoHits};

    return data;
}