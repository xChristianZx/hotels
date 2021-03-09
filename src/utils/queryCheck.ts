import { getAlpha3Code } from 'i18n-iso-countries';

interface IClientQuery {
  starRating?: { [key: string]: string };
  start?: string;
  end?: string;
  country?: { [key: string]: string };
}

/**
 * Checks the query for parameters that need to be converted
 * according to Impala API specs.
 *
 * https://docs.impala.travel/docs/booking-api/docs/good-to-know/dates-currencies-standards.md#country-codes
 *
 *  @export
 * @param {IClientQuery} query
 * @returns {IClientQuery} new req.query obj
 */
export async function queryCheck(query: IClientQuery) {
  try {
    let queryObj = { ...query };
    if (query.hasOwnProperty('country')) {
      const country = query.country!.eq;
      const ISOCountryCode = convertCountryToCode(country);
      queryObj['country'] = { eq: ISOCountryCode };
    }
    return queryObj;
  } catch (error) {
    throw new Error(error.message);
  }
}

function convertCountryToCode(country: string): string {
  try {
    const countryCode = getAlpha3Code(country, 'en');

    if (countryCode === undefined) {
      throw new Error('Bad destination input');
    }
    return countryCode;
  } catch (error) {
    throw new Error(
      error.message || 'Could not convert country string to ISO country code'
    );
  }
}
