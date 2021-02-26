import HotelItem from '../../components/hotels/HotelItem';

export async function getStaticProps() {
  const allHotels = await fetch(
    'http://localhost:4000/?starRating[gte]=5'
  ).then(data => data.json());
  return {
    props: {
      hotels: allHotels.data,
    },
  };
}

export default function Hotels({ hotels }) {
  console.log(hotels);
  function renderList(list) {
    return (
      <ul className="flex flex-col flex-grow p-2">
        {list.map(hotel => (
          <HotelItem key={hotel.hotelId} hotel={hotel} />
        ))}
      </ul>
    );
  }
  return <div>{hotels ? renderList(hotels) : <p>No List!</p>}</div>;
}
