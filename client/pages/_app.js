import { useState } from 'react';
import '../styles/globals.css';
import Header from '../components/header/header';
import { useRouter } from 'next/router';
import { SearchQueryProvider } from '../context/searchQueryContext';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      {router.route !== '/' && <Header />}

      <SearchQueryProvider>
        <Component {...pageProps} />
      </SearchQueryProvider>
    </>
  );
}

export default MyApp;
