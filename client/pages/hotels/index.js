import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from '../../config/config';
import HotelItem from '../../components/hotels/HotelItem';
import SearchBar from '../../components/searchbar/SearchBar';

export default function Hotels(props) {
  const { initialHotels, searchQuery, setSearchQuery } = props;

  const router = useRouter();
  const { query } = router;

  const [hotels, setHotels] = useState(initialHotels);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (router.query) {
      setSearchQuery(router.query);
    }
  }, [router.query]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const BASE_URL = 'http://localhost:4000/';

      const res = await axios.get(BASE_URL, {
        params: searchQuery,
      });
      console.log('RES', res);

      if (res.status < 300) {
        setHotels(res.data.data);
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
          ...(destination && { ['country[eq]']: destination }),
          ...(startDate && endDate && { start: startDate, end: endDate }),
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const renderList = list => {
    return (
      <ul className="flex flex-col p-2 w-full 2xl:w-4/5">
        {list.map(hotel => (
          <HotelItem
            key={hotel.hotelId}
            hotel={hotel}
            destination={router.query['country[eq]']}
            startDate={router.query.start || ''}
            endDate={router.query.end || ''}
          />
        ))}
      </ul>
    );
  };
  return (
    <>
      <Head>
        <title>
          Hotels |{' '}
          {query['country[eq]']
            ? query['country[eq]']
            : 'Where do you want to go?'}{' '}
          {query.start && query.end && `- ${query.start}-${query.end}`}
        </title>
      </Head>
      <SearchBar
        {...props}
        buttonName="Update"
        onUpdateHandler={searchBarOnUpdateHandler}
      />
      <div className="flex w-full justify-center">
        {isLoading ? (
          <div className="flex w-full h-52 justify-center items-center">
            Loading...
          </div>
        ) : hotels.length > 0 ? (
          renderList(hotels)
        ) : (
          <p>
            Sorry, there are no hotels available for your destination or dates.
          </p>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { query } = ctx;

  const res = await axios.get('/hotels', { params: query });
  // console.log('SSR AXIOS RES', res);

  const { data } = await res.data;

  return {
    props: {
      initialHotels: data,
    },
  };
}
