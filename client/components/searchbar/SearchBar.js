import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { DateTime } from 'luxon';
import { Input } from '../ui/Input';
import { MIN_START_DATE } from '../../utils/helper';

const DestinationComboBox = dynamic(() => import('./DestinationComboBox'), {
  ssr: false,
});

export default function SearchBar({ buttonName, onUpdateHandler }) {
  const { query, pathname } = useRouter();

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
    <div className="flex border-b w-full justify-center">
      <form
        className="flex flex-col w-full h-1/2 space-y-2 justify-center items-center p-4 lg:flex-row lg:justify-around lg:space-y-0 lg:space-x-8 xl:w-4/5"
        onSubmit={onSubmitHandler}
      >
        {pathname !== '/hotels/[hotelId]' && (
          <DestinationComboBox selectedItemChangeHandler={setDestination} />
        )}

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
        <button
          type="submit"
          className="flex items-stretch justify-center lg:self-end px-8 py-2 border-b border-gray-900 text-base text-white font-light bg-gray-900 hover:bg-gray-800"
        >
          {buttonName || 'Check Availability'}
        </button>
      </form>
    </div>
  );
}
