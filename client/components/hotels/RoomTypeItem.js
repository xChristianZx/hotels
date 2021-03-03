import Link from 'next/link';
import Image from 'next/image';

export default function RoomTypeItem({ room }) {
  return (
    <li className="flex flex-col lg:flex-row justify-center items-center min-h-screen h-screen w-full mb-2 p-4 bg-gray-100">
      <div className="relative p-2 w-full min-h-1/2 shadow-lg">
        <Image
          layout="fill"
          objectFit="cover"
          quality={100}
          loading="eager"
          src={room.images[0].url}
          alt={
            room.images[0].altText
              ? room.images[0].altText
              : `Image of ${room.name}`
          }
        />
      </div>
      <div className="flex flex-col justify-center items-center p-4 w-full min-h-1/2 border-gray-100 border">
        <p className="text-2xl font-thin font-serif text-center">{room.name}</p>
        {/* <p className="p-4 italic font-thin">
          {hotel.address.city}, {hotel.address.country}
        </p>
        <p className="p-4">{hotel.starRating} Stars</p> */}
        {/* <Link href={`/hotels/${hotel.hotelId}`}> */}
        <button className="flex items-center justify-center px-8 py-3 border text-base text-white font-medium bg-gray-900 shadow-lg">
          Book Now
        </button>
        {/* </Link> */}
      </div>
    </li>
  );
}
