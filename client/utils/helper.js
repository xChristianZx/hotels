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
