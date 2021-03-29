import { useState } from 'react';
import '../styles/globals.css';
import Header from '../components/header/header';

function MyApp({ Component, pageProps }) {
  const [searchQuery, setSearchQuery] = useState({});

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
