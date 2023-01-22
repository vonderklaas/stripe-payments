import React from 'react';
import { Button } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';
import { getProduct } from '../data';

interface CartProductProps {
  id: string;
  quantity: number | undefined;
}

export const CartProduct = ({ id, quantity }: CartProductProps) => {
  const cart = useContext(CartContext);
  const productData = getProduct(id);

  return (
    <>
      <h3>{productData?.title}</h3>
      <p>{quantity} total</p>
      <p>{(quantity! * productData?.price!).toFixed(2)}€</p>
      <Button
        variant='danger'
        onClick={() => cart.deleteFromCart(id)}
        size='sm'
      >
        Remove
      </Button>
      <hr />
    </>
  );
};
