/**
 * Calculates sum and average of an array of numbers
 * @param {Array} arr - Array of numbers
 * @returns {Object} Object with sum and average
 */
export function getSumAndAverage(arr) {
    const sum = arr.reduce((a, b) => a + b, 0);
    const avg = arr.length ? sum / arr.length : 0;
    return { sum, avg };
}

/**
 * Converts seconds to MM:SS format
 * @param {number} num - Number of seconds
 * @returns {string} Formatted time string
 */
export function divMinutesAndSeconds(num) {
    const minutes = Math.floor(num / 60);
    const seconds = num % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}