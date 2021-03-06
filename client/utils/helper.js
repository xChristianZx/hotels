/**
 * Removes "[SANDBOX]" from hotel name
 * from Impala sandbox api
 * @param {*} str
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
