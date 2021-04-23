import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import SearchBar from '../components/searchbar/SearchBar';
import { heroImages } from '../utils/landingPageImages';
import { getRandomIntRange } from '../utils/helper';

export default function Home({ hotels }) {
  const router = useRouter();

  const genRandomNum = getRandomIntRange(0, heroImages.length - 1);

  // const currentHero = heroImages[genRandomNum];
  const currentHero = heroImages[0];

  const onClickSearchHandler = (destination, startDate, endDate) => {
    router.push(
      {
        pathname: '/hotels',
        query: {
          ...(destination && { ['country[eq]']: destination }),
          ...(startDate && endDate && { start: startDate, end: endDate }),
        },
      },
      undefined
    );
  };

  return (
    <div className="h-screen">
      <Head>
        <title>Hotels - Your getaway awaits...</title>
      </Head>
      <main className="h-full">
        <section className="relative">
          <div className="relative h-full">
            <img
              className="bg-cover w-full"
              src={currentHero.url}
              alt={currentHero.name}
            />
            <div className="absolute bottom-0 right-0 p-3 text-gray-300 hover:text-white bg-gray-400 bg-opacity-20 hover:bg-opacity-40 italic text-xs xl:text-lg">
              <Link href={`/hotels/${currentHero.hotelId}`}>
                <a className="">
                  <p className="font-light">{currentHero.name}</p>
                  <p className="font-thin">
                    {currentHero.address.city},{' '}
                    {currentHero.address.countryName}
                  </p>
                </a>
              </Link>
            </div>
          </div>
          <div className="bg-white bg-opacity-60 inset-x-0 xl:absolute xl:top-20">
            <SearchBar
              buttonName="Search"
              onUpdateHandler={onClickSearchHandler}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
