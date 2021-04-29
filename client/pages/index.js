import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from '../components/header/header';
import SearchBar from '../components/searchbar/SearchBar';
import { heroImages } from '../utils/landingPageImages';

export default function Home({ searchQuery, setSearchQuery }) {
  const router = useRouter();

  const currentHero = heroImages[0];

  const onClickSearchHandler = (destination, startDate, endDate) => {
    // Need to setSearchQuery on this route transition to prevent duplicate data fetch on '/hotels' page load route
    setSearchQuery({
      ...(destination && { ['country[eq]']: destination }),
      ...(startDate && endDate && { start: startDate, end: endDate }),
    });
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
    <>
      <div className="min-h-screen">
        <Head>
          <title>Hotels - Your journey awaits</title>
        </Head>
        <main className="h-full">
          <section className="relative">
            <div className="xl:absolute z-50">
              {/* Create Header compound component? */}
              <Header
                cx={{
                  wrapper: 'xl:border-0 xl:text-white',
                  links: 'xl:font-medium',
                }}
              />
            </div>
            <div className="relative">
              <img
                className="object-cover max-h-screen w-full"
                src={currentHero.url}
                alt={currentHero.name}
              />
              {/* <div className="absolute bottom-10 inset-x-0 text-center text-white font-extralight text-2xl xl:top-72 xl:text-3l">
                <p className="uppercase tracking-widest w-auto">Your journey awaits</p>
              </div> */}
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
            <div className="flex justify-center w-full xl:absolute xl:top-32">
              <div className="bg-white bg-opacity-40 w-full xl:w-5/6 border-0">
                <SearchBar
                  buttonName="Search"
                  cx={{ wrapper: 'border-none' }}
                  onUpdateHandler={onClickSearchHandler}
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
