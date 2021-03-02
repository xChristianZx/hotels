import Head from 'next/head';

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
    <div>
      <Head>
        <title>Hotels</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>LANDING PAGE TO BE BUILT</main>
    </div>
  );
}
