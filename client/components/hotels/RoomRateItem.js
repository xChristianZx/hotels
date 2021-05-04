import {
  diffInDays,
  formatToCurrency,
  convertToTwoDecimal,
  calcAvgDailyRate,
} from '../../utils/helper';
import { useRouter } from 'next/router';

export default function RoomRateItem({ rates }) {
  const router = useRouter();
  const { start, end } = router.query;

  const formatRoomRate = roomRateObj => {
    const { retailRate, start, end } = roomRateObj;
    const { amount, currency } = retailRate.total;

    const totalNights = diffInDays(start, end);

    const dailyAvgRate = calcAvgDailyRate(amount, totalNights);

    const fRateAmount = convertToTwoDecimal(amount);

    return (
      <>
        <div>
          <span className="font-medium text-xl sm:text-2xl">
            {formatToCurrency(convertToTwoDecimal(dailyAvgRate), currency.code)}
          </span>
          <span className="text-base sm:text-xl font-light"> / night</span>
        </div>
        <div className="font-light text-sm text-gray-700">
          <span>{formatToCurrency(fRateAmount, currency.code)}</span>
          <span> total</span>
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-row sm:flex-col w-full justify-around sm:justify-start items-center">
      <div className="flex justify-center sm:justify-end items-center w-full h-full">
        <div className="flex flex-col justify-center sm:items-end">
          {rates.length > 0 ? (
            formatRoomRate(rates[0])
          ) : start && end ? (
            <span className="text-sm italic">
              Not available for these dates
            </span>
          ) : (
            <span className="text-sm italic">
              Please enter your dates of stay to see room rates
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center sm:py-2 w-full">
        {rates.length > 0 && (
          <button className=" px-8 py-3 border text-base text-white font-medium bg-gray-900 shadow-lg">
            Book Now
          </button>
        )}
      </div>
    </div>
  );
}
