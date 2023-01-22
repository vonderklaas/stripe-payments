require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = 4000;
const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.post('/checkout', async (req, res) => {
  const items = req.body.items;
  let lineItems = [];
  items.forEach((item) => {
    lineItems.push({
      price: item.id,
      quantity: item.quantity,
    });
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: 'payment',
    success_url: 'http://localhost:5173/success',
    cancel_url: 'http://localhost:5173/cancel',
  });

  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}!`);
});
