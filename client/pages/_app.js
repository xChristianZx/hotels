import { useState } from 'react';
import '../styles/globals.css';
import Header from '../components/header/header';

function MyApp({ Component, pageProps }) {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [url, setUrl] = useState('http://localhost:4000/');

  return (
    <>
      <Header />
      <Component
        {...pageProps}
        destination={destination}
        setDestination={setDestination}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        url={url}
        setUrl={setUrl}
      />
    </>
  );
}

export default MyApp;
