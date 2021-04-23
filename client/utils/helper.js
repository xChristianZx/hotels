import { DateTime } from 'luxon';

/**
 * Removes "[SANDBOX]" from hotel name
 * from Impala sandbox api
 * @param {string} str
 */
export function trimHotelName(str) {
  const regex = /\[SANDBOX]/gi;
  return str.replace(regex, '');
}

/**
 * For Date type inputs to set the minimum start date to the local
 * day in the YYYY-MM-DD format.
 */
export const MIN_START_DATE = new Date().toLocaleDateString('en-CA');

/**
 * Returns the number of days between two dates.
 *
 * @param {string} startDate - string in ISO 8601 format - ex. 'yyyy-mm-dd'
 * @param {string} endDate - string in ISO 8601 format - ex. 'yyyy-mm-dd'
 * @returns {number} - Number of days
 */
export const diffInDays = (startDate, endDate) => {
  const start = DateTime.fromISO(startDate);
  const end = DateTime.fromISO(endDate);

  const diffDay = end.diff(start, 'days');

  const pDiff = diffDay.toObject();

  return pDiff.days;
};

/**
 * Formats and styles the currency as defined by the Impala API response and the users
 * browser language.
 
* Note: this does NOT convert the currency based on exchange rate.
 *
 * @param {number} amt - Number to be formatted - Ex. 248.16
 * @param {string} currencyCode - In ISO 4217 format - Ex. "GBP", "USD"
 * @param {string} [userLanguage='en-US'] Language Identifier - Defaults to 'en-US'
 * @returns {string} Ex. £248.16
 */
export const formatToCurrency = (amt, currencyCode, userLanguage = 'en-US') => {
  // Get user language string
  const userLang =
    typeof window !== 'undefined' ? navigator.language : userLanguage;

  // Build NumberFormat constructor
  const currencyFormat = new Intl.NumberFormat(userLang, {
    style: 'currency',
    currency: currencyCode,
  });

  return currencyFormat.format(amt);
};

/**
 * Converts whole integer amounts to floating point two decimal.
 * Imapala sends room rate amounts as whole nums, as certain currencies are
 * not displayed in cents.
 *
 * https://docs.impala.travel/docs/booking-api/docs/good-to-know/dates-currencies-standards.md#prices--currency
 *
 * @param {number} num - Integer to be formatted
 * @returns {number} - Float
 */
export const convertToTwoDecimal = num => {
  return num / 100;
};

/**
 *
 * @param {number} amt - Total rate amount
 * @param {number} days - Total days of stay
 * @returns {number} - Average daily rate
 */
export const calcAvgDailyRate = (amt, days) => {
  return amt / days;
};

/**
 * Takes an array of keys to filter from the query object.
 *
 * @export
 * @param {object} query - The router.query object
 * @param {Array<string>} keysArr - The array of keys to excluded from the query object
 * @returns {object} - Filtered query object
 */
export function filterQuery(query, keysArr) {
  return Object.keys(query)
    .filter(item => !keysArr.includes(item))
    .reduce((acc, key) => ({ ...acc, [key]: query[key] }), {});
}

export function getRandomIntRange(min = 0, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
