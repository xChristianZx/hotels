import Link from 'next/link';
import LoginForm from '../../components/forms/LoginForm';
import { heroImages } from '../../utils/landingPageImages';

export default function Login() {
  const currentHero = heroImages[2];
  return (
    <div className="relative sm:px-4 bg-gray-200 flex flex-col flex-grow justify-center items-center">
      <img
        className="absolute inset-0 z-0 w-full h-full object-cover object-bottom filter hue-rotate-15"
        src={currentHero.url}
      />
      <div className="absolute bottom-0 right-0 p-3 text-gray-300 hover:text-white bg-gray-400 bg-opacity-20 hover:bg-opacity-40 italic text-xs xl:text-lg">
        <Link href={`/hotels/${currentHero.hotelId}`}>
          <a className="">
            <p className="font-light">{currentHero.name}</p>
            <p className="font-thin">
              {currentHero.address.city}, {currentHero.address.countryName}
            </p>
          </a>
        </Link>
      </div>
      <LoginForm />
    </div>
  );
}
