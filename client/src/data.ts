import { ProductType } from './types';

export const products: ProductType[] = [
  {
    id: 'price_1MT2UHAXDcvV4HjTNCmKIzpj',
    title: 'Black Tea',
    description: 'Delicious and aromatic, no doubt!',
    price: 4.99,
  },
  {
    id: 'price_1MT2W4AXDcvV4HjTEZ5RrVFD',
    title: 'Sunglasses',
    description: 'Explore the spots on the sun, on Google Images',
    price: 24.99,
  },
  {
    id: 'price_1MT2WwAXDcvV4HjTF9eCgZGh',
    title: 'Book',
    description: 'An inspiring story inside, trust me',
    price: 19.99,
  },
  {
    id: 'price_1MT2XQAXDcvV4HjTdnolwqxD',
    title: 'Diary',
    description: 'Chance to express yourself',
    price: 14.99,
  },
  {
    id: 'price_1MT2Y4AXDcvV4HjTLUbvl8Fo',
    title: 'Pen',
    description: 'Take a pen, become a writer',
    price: 0.99,
  },
];

export const getProduct = (id: string): ProductType | undefined => {
  let productData = products.find((product) => product.id === id);
  if (!productData) {
    console.log('This product does not exist:', id);
  }
  return productData;
};
