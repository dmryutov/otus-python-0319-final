/**
 * Try to convert string to integer
 * @param {string} str - Input string
 * @return {?number} Converted number
 */
export const tryParseInt = (str) => {
    if (str === '') {
        return null;
    }
    return (!Number.isNaN(str) && parseInt(str, 10)) || str;
};


/**
 * Try to convert string to float
 * @param {string} str - Input string
 * @return {?number} Converted number
 */
export const tryParseFloat = (str) => {
    if (str === '') {
        return null;
    }
    return (!Number.isNaN(str) && parseFloat(str, 10)) || str;
};


/**
 * Round number with precision
 * @param {number} number - Input number
 * @param {number} digits - Precision
 * @return {number} Rounded number
 */
export const round = (number, digits = 0) => {
    const multiplier = 10 ** digits; // Math.pow(10, digits);
    return Math.round(number * multiplier) / multiplier;
};


/**
 * Round number with precision and convert to string by using current locale
 * @param {number} number - Input number
 * @param {number} digits - Precision
 * @param {string} locale - Locale name
 * @return {string} String representation of number
 */
export const roundLocale = (number, digits = 0, locale = 'ru-RU') => {
    const roundedNumber = round(number, digits);
    return (Number.isNaN(roundedNumber) && '-') || roundedNumber.toLocaleString(locale);
};


/**
 * Generate random ID
 * @param {number} length - ID length
 * @return {string} ID
 */
export const uniqueID = (length = 10) => {
    const newId = Array(length - 1).fill(null)
        .map(() => Math.random().toString(36).charAt(2))
        .join('');
    return `${newId}s`;
};
