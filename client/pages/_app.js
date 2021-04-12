import { useState } from 'react';
import '../styles/globals.css';
import Header from '../components/header/header';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(router.query || {});

  return (
    <>
      <Header />
      <Component
        {...pageProps}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </>
  );
}

export default MyApp;
