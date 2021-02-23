// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  const data = await fetch('http://localhost:4000/')
    .then(blob => blob.data)
    .then(data => console.log(data))
    .catch(err => console.error(err));

  res.status(200).json(data);
  // res.status(200).json({ name: 'John Doe' })
};
