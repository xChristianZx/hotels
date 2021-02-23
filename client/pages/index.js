import Head from 'next/head';
import styles from '../styles/Home.module.css';

export async function getStaticProps() {
  const allHotels = await fetch('http://localhost:4000/').then(data =>
    data.json()
  );
  console.log(allHotels);
  return {
    props: {
      hotels: allHotels.data,
    },
  };
}

export default function Home({ hotels }) {
  function renderList(list) {
    return list.map(item => (
      <li key={item.hotelId}>
        <div>
          <img width={100} height={100} src={item.images[0].url} />
        </div>
        <div>
          <h2>{item.name}</h2>
        </div>
      </li>
    ));
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ul>{hotels ? renderList(hotels) : <p>No List!</p>}</ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
