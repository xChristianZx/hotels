import { useEffect, useState } from 'react';
import axios from '../../config/config';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { trimHotelName } from '../../utils/helper';
import SearchBar from '../../components/searchbar/SearchBar';
import RoomTypeItem from '../../components/hotels/RoomTypeItem';
import useData from '../../utils/useData/useData';
import { filterQuery } from '../../utils/helper';

export default function ShowHotel(props) {
  const { initHotelData, searchQuery, setSearchQuery } = props;

  const router = useRouter();
  const { start, end } = router.query;

  const [{ data, isLoading, isError }, fetchData] = useData(
    `/hotels/${initHotelData.hotelId}`,
    searchQuery,
    initHotelData
  );

  useEffect(() => {
    if (router.query) {
      // Remove hotelId from searchQuery
      const filteredQuery = filterQuery(router.query, ['hotelId']);
      setSearchQuery(filteredQuery);
    }
  }, [router.query]);

  useEffect(() => {
    fetchData(searchQuery);
  }, [searchQuery]);

  const searchBarOnUpdateHandler = (destination, startDate, endDate) => {
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
      <ul className="flex flex-col flex-grow p-4 bg-gray-50">
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
      {!isLoading && Object.keys(data).length > 0 ? (
        renderRoomTypesList(data.roomTypes)
      ) : (
        <div className="flex w-full flex-grow justify-center items-center bg-gray-50">
          Loading...
        </div>
      )}
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { query } = ctx;

  const res = await axios.get(`/hotels/${query.hotelId}`, {
    params:
      query.start && query.end ? { start: query.start, end: query.end } : {},
  });

  const data = await res.data;
  return {
    props: {
      initHotelData: data,
    },
  };
}
