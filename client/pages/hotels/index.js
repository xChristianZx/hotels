import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import HotelItem from '../../components/hotels/HotelItem';
import SearchBar from '../../components/searchbar/SearchBar';

export default function Hotels(props) {
  const {
    destination,
    setDestination,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    url,
  } = props;

  const router = useRouter();
  const { query } = router;

  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (query.start) {
      setStartDate(query.start);
    }
    if (query.end) {
      setEndDate(query.end);
    }
    if (query['country[eq]']) {
      setDestination(query['country[eq]']);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const BASE_URL = 'http://localhost:4000/';
      console.log('CHECK DESTINATION', destination);
      console.log('CHECK ROUTER.QUERY[COUNTRY]', router.query['country[eq]']);

      const res = await axios.get(BASE_URL, {
        params: {
          ['country[eq]']: destination || query['country[eq]'],
          start: startDate || query.start,
          end: endDate || query.end,
        },
      });
      console.log('RES', res);

      if (res.status < 300) {
        setHotels(res.data.data);
        router.push(
          {
            pathname: '/hotels',
            query: {
              ...((destination || router.query['country[eq]']) && {
                ['country[eq]']: destination || router.query['country[eq]'],
              }),
              ...((startDate || router.query.start) && {
                start: startDate || router.query.start,
              }),
              ...((endDate || router.query.end) && {
                end: endDate || router.query.end,
              }),
            },
          },
          undefined,
          { shallow: true }
        );
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

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
      <SearchBar {...props} buttonName="Update" />
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

export async function getServerSideProps(props) {
  const { query } = props;
  // console.log('SSR Query', query);
  const BASE_URL = 'http://localhost:4000';
  const res = await axios.get(BASE_URL, {
    params: {
      ['country[eq]']: query['country[eq]'],
      start: query.start,
      end: query.end,
    },
  });
  console.log('SSR AXIOS RES', res);

  const { data } = await res.data;

  return {
    props: {
      hotels: data,
      destination: query['country[eq]'] || '',
      startDate: query.start || '',
      endDate: query.end || '',
      url: BASE_URL + res.request.path,
    },
  };
}
