import Link from 'next/link';
import Image from 'next/image';
import Carousel from '../carousel/Carousel';
import RoomRateItem from './RoomRateItem';

export default function RoomTypeItem({ room }) {
  // console.log('RoomTypeItem', room);

  return (
    <li className="flex flex-col lg:flex-row justify-center items-center h-screen lg:h-auto w-full mb-2 p-4 bg-white">
      <div className="relative p-2 w-full min-h-1/2 shadow-xl lg:w-1/2 lg:self-stretch">
        <Carousel images={room.images} />
      </div>
      <div className="flex flex-col justify-start items-center py-4 lg:px-6 w-full h-1/2 min-h-1/2">
        {/* Description */}
        <div className="h-4/6 w-full font-sans space-y-4">
          <p className="text-xl font-light uppercase">{room.name}</p>
          <p className="text-xs">Sleeps {room.maxOccupancy}</p>
          <p className="text-sm h-1/2 max-h-1/2 overflow-y-scroll whitespace-pre-line text-justify">
            {room.description}
          </p>
        </div>
        <RoomRateItem rates={room.rates} />
      </div>
    </li>
  );
}
