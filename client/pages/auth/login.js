import Link from 'next/link';
import Head from 'next/head';
import Header from '../../components/header/header';
import LoginForm from '../../components/forms/LoginForm';
import { heroImages } from '../../utils/landingPageImages';

export default function Login() {
  const currentHero = heroImages[2];
  return (
    <div className="min-h-screen">
      <Head>
        <title>Hotels - Login</title>
      </Head>
      <div className="relative bg-gray-200 flex flex-col justify-between min-h-screen">
        <img
          className="absolute inset-0 z-0 w-full h-full object-cover object-center filter hue-rotate-15"
          src={currentHero.url}
          alt={currentHero.name}
        />
        <div className="bg-gray-50 sm:bg-transparent z-50">
          <Header
            cx={{
              wrapper: 'sm:border-0 sm:text-white sm:bg-transparent',
              links: 'md:font-medium',
            }}
          />
        </div>

        <div className="flex justify-center items-center p-4 lg:p-0 w-full h-full z-50">
          <LoginForm />
        </div>

        <div className="p-3 z-50 self-end text-gray-300 hover:text-white bg-gray-400 bg-opacity-20 hover:bg-opacity-40 italic text-xs xl:text-lg">
          <Link href={`/hotels/${currentHero.hotelId}`}>
            <a>
              <p className="font-light">{currentHero.name}</p>
              <p className="font-thin">
                {currentHero.address.city}, {currentHero.address.countryName}
              </p>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
