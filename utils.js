function generateRandomUniqueNumbers(min = 1, max = 40, maxSize = 7) {
    const drawnNumbersSet = new Set();
    do {
        drawnNumbersSet.add(Math.floor(Math.random() * max + min));
    } while (drawnNumbersSet.size !== maxSize);
    return Array.from(drawnNumbersSet);
}

const simpleSort = (a, b) => a - b;

module.exports = {
    generateRandomUniqueNumbers,
    simpleSort
};