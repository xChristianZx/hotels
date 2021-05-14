import Link from 'next/link';
import Head from 'next/head';
import SignUpForm from '../../components/forms/SignUpForm';
import { heroImages } from '../../utils/landingPageImages';
import Header from '../../components/header/header';

export default function SignUp() {
  const currentHero = heroImages[1];
  return (
    <div className="min-h-screen">
      <Head>
        <title>Hotels - Sign Up</title>
      </Head>
      <div className="relative bg-gray-200 flex flex-col justify-center items-center min-h-screen">
        <img
          className="absolute inset-0 z-0 w-full h-full object-cover object-bottom"
          src={currentHero.url}
        />
        <div className="bg-gray-50 lg:bg-transparent z-50">
          <Header
            cx={{
              wrapper: 'lg:border-0 lg:text-white lg:bg-transparent',
              links: 'lg:font-medium',
            }}
          />
        </div>
        <div className="flex justify-center items-center p-4 lg:p-0 w-full h-full z-50">
          <SignUpForm />
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
