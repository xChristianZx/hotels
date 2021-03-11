import { useEffect, useState } from 'react';
import axios from 'axios';
import HotelItem from '../../components/hotels/HotelItem';
import SearchBar from '../../components/searchbar/SearchBar';

export default function Hotels(props) {
  const { url, hotels, setHotels } = props;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const res = await axios.get(url);
      console.log(res);

      setHotels(res.data.data);
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  function renderList(list) {
    return (
      <ul className="flex flex-col p-2 w-full 2xl:w-4/5">
        {list.map(hotel => (
          <HotelItem key={hotel.hotelId} hotel={hotel} />
        ))}
      </ul>
    );
  }
  return (
    <>
      <SearchBar {...props} buttonName="Update" />
      <div className="flex w-full justify-center">
        {isLoading ? (
          <div className="flex w-full h-52 justify-center items-center">
            Loading...
          </div>
        ) : hotels.length > 0 ? (
          renderList(hotels)
        ) : (
          <p>No List!</p>
        )}
      </div>
    </>
  );
}
