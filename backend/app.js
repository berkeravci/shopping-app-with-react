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
app.get('/products/:id', async (req, res) => {
  const { id } = req.params;

  const eventsFileContent = await fs.readFile('./data/products.json');
  const events = JSON.parse(eventsFileContent);

  const event = events.find((event) => event.id === id);

  if (!event) {
    return res
      .status(404)
      .json({ message: `For the id ${id}, no product could be found.` });
  }

  setTimeout(() => {
    res.json({ event });
  }, 1000);
});


app.post('/products', async (req, res) => {

  const { order } = req.body;

  

  const ordersFileContent = await fs.readFile('./data/orders.json');
  const orders = JSON.parse(ordersFileContent);

  const newOrder = {
     id: Math.round(Math.random() * 10000).toString(),
     ...order,
   };

   orders.push(newOrder);

   await fs.writeFile('./data/orders.json', JSON.stringify(orders));

   res.json({ order: newOrder });
   
});