/**
 * Resize array (change length) and fill additional items with values
 * @param {Array} arr - Initial array
 * @param {number} length - Desired array length
 * @param {*} value - Fill value
 * @return {Array} Array with new length
 */
export const resizeArray = (arr, length, value = []) =>
    arr.concat((new Array(length)).fill(value)).slice(0, length);


/**
 * Calculate cumulative sum of array
 * @param {Array} arr - Initial array
 * @return {Array} Array with summed values
 */
export const cumSum = (arr) =>
    arr.reduce((a, x, i) => [...a, x + (a[i - 1] || 0)], []);
