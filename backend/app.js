import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  next();
});


app.get('/products', async (req, res) => {
  const shopFileContent = await fs.readFile('./data/products.json');
  let products = JSON.parse(shopFileContent);

  // if (search) {
  //   todos = todos.filter((todos) => {
  //     const searchableText = `${todos.title} ${todos.description}`;
  //     return searchableText.toLowerCase().includes(search.toLowerCase());
  //   });
  // }

  // if (max) {
  //   todos = todos.slice(todos.length - max, todos.length);
  // }

  res.json({
    products: products.map((product) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      type: product.type,
      price: product.price,
      rating: product.rating,
      image: product.image,
    })),
  });
});
app.get('/products/images', async (req, res) => {
  const imagesFileContent = await fs.readFile('./data/images.json');
  const images = JSON.parse(imagesFileContent);

  res.json({ images });
});
app.listen(3000, () => {
  console.log('Server running on port 3000');
});