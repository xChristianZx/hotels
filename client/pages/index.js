import Head from 'next/head';
import styles from '../styles/Home.module.css';

export async function getStaticProps() {
  const allHotels = await fetch(
    'http://localhost:4000/?starRating[gte]=4'
  ).then(data => data.json());
  console.log(allHotels);
  return {
    props: {
      hotels: allHotels.data,
    },
  };
}

export default function Home({ hotels }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Hotels</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>LANDING PAGE TO BE BUILT</main>
    </div>
  );
}
