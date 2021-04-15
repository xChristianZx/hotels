import Link from 'next/link';
import Image from 'next/image';
import { stringify } from 'qs';
import Carousel from '../carousel/Carousel';
import { trimHotelName } from '../../utils/helper';

export default function HotelItem({ hotel, destination, startDate, endDate }) {
  function buildShowRouteUrl(hotelId, destination, startDate, endDate) {
    const baseUrl = `/hotels/${hotelId}`;
    let paramsObj = {};
    if (destination) {
      paramsObj = { ...paramsObj, country: { eq: destination } };
    }
    if (startDate && endDate) {
      paramsObj = { ...paramsObj, start: startDate, end: endDate };
    }

    return (
      baseUrl + stringify(paramsObj, { encode: false, addQueryPrefix: true })
    );
  }
  return (
    <li className="flex flex-col lg:flex-row justify-center items-center h-screen lg:h-auto w-full mb-2 p-4 bg-white">
      <div className="relative p-2 w-full min-h-1/2 shadow-xl lg:w-1/2 lg:self-stretch">
        <Carousel images={hotel.images} />
      </div>
      <div className="flex flex-col justify-center items-center p-4 w-full min-h-1/2 bg-white">
        <p className="text-2xl font-thin font-serif text-center">
          {trimHotelName(hotel.name)}
        </p>
        <p className="p-4 italic font-thin">
          {hotel.address.city}, {hotel.address.country}
        </p>
        <p className="p-4">{hotel.starRating} Stars</p>
        <Link
          href={buildShowRouteUrl(
            hotel.hotelId,
            destination,
            startDate,
            endDate
          )}
        >
          <button className="flex items-center justify-center px-8 py-3 border text-base text-white font-medium bg-gray-900">
            Book Now
          </button>
        </Link>
      </div>
    </li>
  );
}
