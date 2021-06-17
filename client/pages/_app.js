import { useState } from 'react';
import '../styles/globals.css';
import { useRouter } from 'next/router';
import { Provider as NextAuthProvider } from 'next-auth/client';
import Header from '../components/header/header';
import { SearchQueryProvider } from '../context/searchQueryContext';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <NextAuthProvider session={pageProps.session}>
        {router.route !== '/' &&
          router.route !== '/auth/signup' &&
          router.route !== '/auth/login' && <Header />}

        <SearchQueryProvider>
          <Component {...pageProps} />
        </SearchQueryProvider>
      </NextAuthProvider>
    </>
  );
}

export default MyApp;
