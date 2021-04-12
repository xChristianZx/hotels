import { useEffect, useState } from 'react';
import axios from '../../config/config';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { trimHotelName } from '../../utils/helper';
import SearchBar from '../../components/searchbar/SearchBar';
import RoomTypeItem from '../../components/hotels/RoomTypeItem';

export default function ShowHotel(props) {
  const { initHotelData, searchQuery, setSearchQuery } = props;

  const router = useRouter();
  const { start, end } = router.query;

  const [hotelData, setHotelData] = useState(initHotelData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (router.query) {
      setSearchQuery(router.query);
    }
  }, [router.query]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/hotels/${hotelData.hotelId}`, {
        params: start && end ? { start, end } : {},
      });

      if (res.status < 300) {
        setHotelData(res.data);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [searchQuery]);

  const searchBarOnUpdateHandler = (destination, startDate, endDate) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          hotelId: hotelData.hotelId,
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
      <ul className="flex flex-col flex-grow p-4">
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
          Hotels - {hotelData ? trimHotelName(hotelData.name) : ''}
          {start && end && `- ${start}-${end}`}
        </title>
      </Head>
      <SearchBar
        {...props}
        onUpdateHandler={searchBarOnUpdateHandler}
        buttonName="Update"
      />
      {!isLoading || Object.keys(hotelData).length > 0 ? (
        renderRoomTypesList(hotelData.roomTypes)
      ) : (
        <p>Loading...</p>
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
