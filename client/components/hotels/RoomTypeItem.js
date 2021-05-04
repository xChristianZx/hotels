import Link from 'next/link';
import Image from 'next/image';
import Carousel from '../carousel/Carousel';
import RoomRateItem from './RoomRateItem';

export default function RoomTypeItem({ room }) {
  // console.log('RoomTypeItem', room);

  return (
    <li className="flex flex-col lg:flex-row justify-center items-center h-screen lg:h-96 w-full mb-2 p-4 bg-white ">
      <div className="flex flex-col lg:flex-row h-full w-full">
        <div className="relative w-full h-1/3 lg:min-h-full shadow-xl lg:w-1/2">
          <Carousel images={room.images} />
        </div>
        <div className="flex flex-col flex-grow lg:h-full justify-start items-center py-4 lg:py-0 lg:px-6 w-full">
          {/* Description */}
          <div className="h-4/6 flex flex-col flex-grow w-full font-sans space-y-4 mb-4">
            <p className="sm:text-xl font-light uppercase">{room.name}</p>
            <p className="text-xs sm:text-sm">Sleeps {room.maxOccupancy}</p>
            <p className="text-sm h-32 min-h-1/2 sm:min-h-0 flex-grow overflow-y-scroll whitespace-pre-line text-justify">
              {room.description}
            </p>
          </div>
          <RoomRateItem rates={room.rates} />
        </div>
      </div>
    </li>
  );
}
