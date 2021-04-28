import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { DateTime } from 'luxon';
import { Input } from '../ui/Input';
import { MIN_START_DATE } from '../../utils/helper';
import DestinationComboBox from './DestinationComboBox';

export default function SearchBar({ buttonName, onUpdateHandler, cx }) {
  const { query, pathname } = useRouter();

  const [isOpen, setIsOpen] = useState(true);

  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const onSubmitHandler = async e => {
    e.preventDefault();
    onUpdateHandler(destination, startDate, endDate);
  };

  useEffect(() => {
    if (startDate > endDate) {
      const d = DateTime.fromISO(startDate).plus({ days: 1 }).toISODate();
      setEndDate(d);
    }
  }, [startDate]);

  useEffect(() => {
    if (query['country[eq]']) {
      setDestination(query['country[eq]']);
    }
    if (query.start) {
      setStartDate(query.start);
    }
    if (query.end) {
      setEndDate(query.end);
    }
  }, [query]);

  return (
    <div
      className={`flex flex-col border-b w-full justify-center items-center ${cx?.wrapper}`}
    >
      {/* <div onClick={() => setIsOpen(!isOpen)} className="bg-purple-300 h-6">
        <span className="absolute top-0 right-0 p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`transform ${
              isOpen && 'rotate-180'
            } bg-blue-300 h-6 w-6`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </div> */}
      <form
        className={`${
          isOpen ? 'visible' : 'hidden'
        } flex flex-col w-full h-1/2 space-y-2 justify-center items-center p-4 lg:flex-row lg:justify-around lg:space-y-0 lg:space-x-8 xl:w-5/6`}
        onSubmit={onSubmitHandler}
      >
        {pathname !== '/hotels/[hotelId]' && (
          <DestinationComboBox
            selectedItem={destination}
            selectedItemChangeHandler={setDestination}
          />
        )}
        <div className="flex py-2 w-full space-x-6">
          <Input
            labelName={'Check In'}
            minValue={MIN_START_DATE}
            name={'start-date'}
            placeholder={'start-date'}
            onChangeHandler={setStartDate}
            showLabel={true}
            type={'date'}
            value={startDate}
          />
          <Input
            labelName={'Check Out'}
            minValue={startDate}
            name={'end-date'}
            placeholder={'end-date'}
            onChangeHandler={setEndDate}
            showLabel={true}
            type={'date'}
            value={endDate}
          />
        </div>
        <div className="py-4 lg:py-0 lg:pt-6">
          <button
            type="submit"
            className="flex items-stretch justify-center lg:self-end px-8 py-2 border-b border-gray-900 text-base text-white font-light bg-gray-900 hover:bg-gray-800"
          >
            {buttonName || 'Check Availability'}
          </button>
        </div>
      </form>
    </div>
  );
}
