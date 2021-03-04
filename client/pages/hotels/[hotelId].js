import { useRouter } from 'next/router';
import { trimHotelName } from '../../utils/helper';
import RoomTypeItem from '../../components/hotels/RoomTypeItem';

const ShowHotel = ({ hotel }) => {
  function renderRoomTypesList(list) {
    return (
      <ul className="flex flex-col flex-grow p-4">
        {list.map(room => (
          <RoomTypeItem key={room.roomTypeId} room={room} />
        ))}
      </ul>
    );
  }
  return hotel ? renderRoomTypesList(hotel.roomTypes) : <p>Loading...</p>;
};

export async function getServerSideProps({ params }) {
  const res = await fetch(`http://localhost:4000/${params.hotelId}`);
  const data = await res.json();
  return { props: { hotel: data } };
}

export default ShowHotel;
