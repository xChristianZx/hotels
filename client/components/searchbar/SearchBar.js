import { useState } from 'react';
import { Input } from '../ui/Input';
import { MIN_START_DATE } from '../../utils/helper';

export default function SearchBar() {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const onSubmitHandler = e => {
    e.preventDefault();
    console.log(destination, startDate, endDate);
  };

  return (
    <div className="border-b w-full">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col h-1/2 space-y-2 justify-center items-center p-4 "
      >
        <Input
          labelName="destination"
          name={'destination'}
          placeholder={'Where do you want to go?'}
          onChangeHandler={setDestination}
          showLabel={true}
          type={'text'}
          value={destination}
        />
        <Input
          labelName={'Start Date'}
          minValue={MIN_START_DATE}
          name={'start-date'}
          placeholder={'start-date'}
          onChangeHandler={setStartDate}
          showLabel={true}
          type={'date'}
          value={startDate}
        />
        <Input
          labelName={'End Date'}
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
          className="flex items-stretch justify-center px-8 py-4 border-b border-gray-900 text-base text-white font-light bg-gray-900 hover:bg-gray-800 focus:outline-none"
        >
          Check Availability
        </button>
      </form>
    </div>
  );
}
