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

  return (
    <>
      <div className="flex justify-end items-center w-full h-1/6 py-8">
        <div className="flex flex-col justify-center items-end">
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

      <div className="flex items-center justify-center py-2 w-full min-h-1/6">
        {rates.length > 0 && (
          <button className=" px-8 py-3 border text-base text-white font-medium bg-gray-900 shadow-lg">
            Book Now
          </button>
        )}
      </div>
    </>
  );
}
