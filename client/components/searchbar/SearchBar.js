import { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from '../ui/Input';
import { MIN_START_DATE } from '../../utils/helper';

export default function SearchBar(props) {
  const {
    setUrl,
    buttonName,
    destination,
    setDestination,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = props;
  console.log(props);

  const onSubmitHandler = async e => {
    e.preventDefault();
    console.log(destination, startDate, endDate);
    const url = `http://localhost:4000/?starRating[gte]=4&start=${startDate}&end=${endDate}&country[eq]=${destination}`;
    setUrl(url);
  };

  return (
    <div className="flex border-b w-full justify-center">
      <form
        className="flex flex-col w-full h-1/2 space-y-2 justify-center items-center p-4 lg:flex-row lg:justify-around lg:space-y-0 lg:space-x-8 xl:w-3/4"
        onSubmit={onSubmitHandler}
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
