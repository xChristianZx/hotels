import { trimHotelName } from '../../utils/helper';

export default function HotelNameHeader({ hotelName, city, country }) {
  return (
    <div className="w-full h-auto p-4 border-b">
      <div className="flex flex-col justify-around items-center h-full md:flex-row md:justify-center md:space-x-8">
        <p className="text-base font-serif tracking-wide sm:text-lg">
          {trimHotelName(hotelName)}
        </p>
        <div className="font-thin italic text-sm sm:text-base">
          <span>
            {city}, {country}
          </span>
        </div>
      </div>
    </div>
  );
}
