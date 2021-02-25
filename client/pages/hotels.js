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

export default function Hotels({ hotels }) {
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
    <div>
      <ul>{hotels ? renderList(hotels) : <p>No List!</p>}</ul>
    </div>
  );
}
