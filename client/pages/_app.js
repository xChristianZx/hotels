import { useState } from 'react';
import '../styles/globals.css';
import Header from '../components/header/header';
import { useRouter } from 'next/router';
import { filterQuery } from '../utils/helper';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const initSearchQuery = filterQuery(router.query, ['hotelId']);
  // TODO - create useSearchQuery reducer?
  const [searchQuery, setSearchQuery] = useState(initSearchQuery || {});

  return (
    <>
      {router.route !== '/' && <Header />}
      <Component
        {...pageProps}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </>
  );
}

export default MyApp;
