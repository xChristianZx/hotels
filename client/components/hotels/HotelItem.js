import Link from 'next/link';
import Image from 'next/image';
import Carousel from '../carousel/Carousel';
import { trimHotelName } from '../../utils/helper';

export default function HotelItem({ hotel }) {
  return (
    <li className="flex flex-col lg:flex-row justify-center items-center min-h-screen h-screen lg:h-auto w-full mb-2 p-4 bg-gray-50">
      <div className="relative p-2 w-full min-h-1/2 shadow-xl lg:w-1/2 lg:self-stretch">
        <Carousel images={hotel.images} />
      </div>
      <div className="flex flex-col justify-center items-center p-4 w-full min-h-1/2 border-gray-100 border bg-gray-50">
        <p className="text-2xl font-thin font-serif text-center">
          {trimHotelName(hotel.name)}
        </p>
        <p className="p-4 italic font-thin">
          {hotel.address.city}, {hotel.address.country}
        </p>
        <p className="p-4">{hotel.starRating} Stars</p>
        <Link href={`/hotels/${hotel.hotelId}`}>
          <button className="flex items-center justify-center px-8 py-3 border text-base text-white font-medium bg-gray-900">
            Book Now
          </button>
        </Link>
      </div>
    </li>
  );
}
