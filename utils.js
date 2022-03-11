/**
 * 
 * @param {number} min 
 * @param {number} max 
 * @param {number} maxSize 
 * @returns {number[]} Sorted array of unique numbers
 */
 function generateRandomUniqueNumbers(min = 1, max = 40, maxSize = 7) {
    const _min = (min > 0) ? min : 1; 
    const _max = (max < 41) ? max : 40;
    const _maxSize = (maxSize > 0) ? maxSize : 7;
    if (_maxSize > _max - _min + 1) throw 'Can\'t draw unique numbers from this set';

    const drawnNumbersSet = new Set();
    do {
        drawnNumbersSet.add(Math.floor(Math.random() * _max + _min));
    } while (drawnNumbersSet.size !== _maxSize);
    return Array.from(drawnNumbersSet).sort(simpleSort);
}

const simpleSort = (a, b) => a - b;

module.exports = {
    generateRandomUniqueNumbers,
    simpleSort
};
