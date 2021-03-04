import Link from 'next/link';
import Image from 'next/image';
import Carousel from '../carousel/Carousel';

export default function RoomTypeItem({ room }) {
  return (
    <li className="flex flex-col lg:flex-row justify-center items-center min-h-screen h-screen lg:h-auto w-full mb-2 p-4 bg-gray-50">
      <div className="relative p-2 w-full min-h-1/2 shadow-xl lg:w-1/2 lg:self-stretch">
        <Carousel images={room.images} />
      </div>
      <div className="flex flex-col justify-start items-center py-4 lg:px-6 w-full h-1/2 min-h-1/2">
        {/* Description */}
        <div className="h-5/6 w-full font-sans space-y-4">
          <p className="text-xl font-light uppercase">{room.name}</p>
          <p className="text-xs">Sleeps {room.maxOccupancy}</p>
          <p className="text-sm h-1/2 max-h-1/2 overflow-y-scroll whitespace-pre-line">
            {room.description}
          </p>
        </div>
        <div className="py-2 h-1/6">
          <button className="flex items-center justify-center px-8 py-3 border text-base text-white font-medium bg-gray-900 shadow-lg">
            Book Now
          </button>
        </div>
      </div>
    </li>
  );
}
