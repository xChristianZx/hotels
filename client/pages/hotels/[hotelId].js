import { useEffect, useState } from 'react';
import axios from '../../config/config';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import { trimHotelName } from '../../utils/helper';
import SearchBar from '../../components/searchbar/SearchBar';
import RoomTypeItem from '../../components/hotels/RoomTypeItem';
import HotelNameHeader from '../../components/hotels/HotelNameHeader';
import useData from '../../utils/useData/useData';
import usePrevious from '../../utils/usePrevious/usePrevious';
import { filterQuery } from '../../utils/helper';
import { useSearchQuery } from '../../context/searchQueryContext';

export default function ShowHotel(props) {
  const { initHotelData } = props;

  const router = useRouter();
  const { start, end } = router.query;

  const [searchQuery, setSearchQuery] = useSearchQuery();

  const previousQuery = usePrevious(router.query);

  const [{ data, isLoading, isError }, fetchData] = useData(
    `/hotels/${initHotelData.hotelId}`,
    searchQuery,
    initHotelData
  );

  useEffect(() => {
    if (previousQuery !== router.query) {
      // Remove hotelId from setSearchQuery update
      const filteredQuery = filterQuery(router.query, ['hotelId']);
      setSearchQuery(filteredQuery);
    }
  }, [router.query.start, router.query.end]);

  useEffect(() => {
    fetchData(searchQuery);
  }, [searchQuery.start, searchQuery.end]);

  const searchBarOnUpdateHandler = (destination, startDate, endDate) => {
    setSearchQuery(prevSearchQ => ({
      ...prevSearchQ,
      ...(startDate && endDate && { start: startDate, end: endDate }),
    }));
    router.push(
      {
        pathname: router.pathname,
        query: {
          hotelId: data.hotelId,
          ...(destination && { ['country[eq]']: destination }),
          ...(startDate && endDate && { start: startDate, end: endDate }),
        },
      },
      undefined,
      { shallow: true }
    );
  };

  function renderRoomTypesList(list) {
    return (
      <ul className="flex flex-col flex-grow w-full xl:max-w-screen-2xl p-4">
        {list.map(room => (
          <RoomTypeItem key={room.roomTypeId} room={room} />
        ))}
      </ul>
    );
  }

  return (
    <>
      <Head>
        <title>
          Hotels - {data ? trimHotelName(data.name) : ''}
          {start && end && `- ${start}-${end}`}
        </title>
      </Head>
      <SearchBar
        {...props}
        onUpdateHandler={searchBarOnUpdateHandler}
        buttonName="Update"
      />
      <HotelNameHeader
        hotelName={data.name}
        city={data.address.city}
        country={data.address.countryName}
      />
      <div className="flex flex-grow justify-center items-center w-full bg-gray-50">
        {!isLoading && Object.keys(data).length > 0 ? (
          renderRoomTypesList(data.roomTypes)
        ) : (
          <div className="flex w-full flex-grow justify-center items-center">
            Loading...
          </div>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const { start, end } = query;
  const session = await getSession(ctx);
  const res = await axios.get(`/hotels/${query.hotelId}`, {
    params: start && end ? { start, end } : {},
  });

  const data = await res.data;
  return {
    props: {
      initHotelData: data,
      session,
    },
  };
}
