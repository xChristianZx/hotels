import Link from 'next/link';
import Image from 'next/image';
import { DateTime } from 'luxon';
import Carousel from '../carousel/Carousel';
import {
  diffInDays,
  formatToCurrency,
  convertToTwoDecimal,
  calcAvgDailyRate,
} from '../../utils/helper';

export default function RoomTypeItem({ room }) {
  console.log('HERE', room);
  const renderRates = roomRateData => {
    console.log('xxxxx', roomRateData);
    return roomRateFormatter(roomRateData);
  };
  return (
    <li className="flex flex-col lg:flex-row justify-center items-center min-h-screen h-screen lg:h-auto w-full mb-2 p-4 bg-gray-50">
      <div className="relative p-2 w-full min-h-1/2 shadow-xl lg:w-1/2 lg:self-stretch">
        <Carousel images={room.images} />
      </div>
      <div className="flex flex-col justify-start items-center py-4 lg:px-6 w-full h-1/2 min-h-1/2">
        {/* Description */}
        <div className="h-4/6 w-full font-sans space-y-4">
          <p className="text-xl font-light uppercase">{room.name}</p>
          <p className="text-xs">Sleeps {room.maxOccupancy}</p>
          <p className="text-sm h-1/2 max-h-1/2 overflow-y-scroll whitespace-pre-line text-justify">
            {room.description}
          </p>
        </div>
        <div className="flex justify-end items-center w-full h-1/6 py-8">
          <div className="flex flex-col justify-center items-end">
            {room.rates.length > 0 ? (
              renderRates(room.rates[0])
            ) : (
              <span className="text-sm italic">
                Not available for these dates
              </span>
            )}
          </div>
        </div>
        {room.rates.length > 0 ? (
          <div className="flex items-center justify-center py-2 w-full min-h-1/6">
            <button className=" px-8 py-3 border text-base text-white font-medium bg-gray-900 shadow-lg">
              Book Now
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    </li>
  );
}

const roomRateFormatter = roomRateObj => {
  console.log('ROOMRATEOBJ!', roomRateObj);
  const { retailRate, start, end } = roomRateObj;
  const { amount, currency } = retailRate.total;

  const totalNights = diffInDays(start, end);

  const dailyAvgRate = calcAvgDailyRate(amount, totalNights);

  const fRateAmount = convertToTwoDecimal(amount);

  return (
    <>
      <div>
        <span className="font-medium text-2xl">
          {formatToCurrency(convertToTwoDecimal(dailyAvgRate), currency.code)}
        </span>
        <span className="text-xl font-light"> / night</span>
      </div>
      <div className="font-light text-sm text-gray-700">
        <span>{formatToCurrency(fRateAmount, currency.code)}</span>
        <span> total</span>
      </div>
    </>
  );
};
