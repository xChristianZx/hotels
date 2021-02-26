/**
 * Removes "[SANDBOX]" from hotel name
 * from Impala sandbox api
 * @param {*} str
 */
export function trimHotelName(str) {
  const regex = /\[SANDBOX]/gi;
  return str.replace(regex, '');
}
