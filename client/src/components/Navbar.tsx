import React from 'react';
import { useState } from 'react';
import { Button, Navbar, Modal } from 'react-bootstrap';

import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

import { CartProduct } from './CartProduct';

import { ProductType } from '../types/index';

export const NavbarComponent = () => {
  const [show, setShow] = useState<boolean>(false);

  const cart = useContext(CartContext);

  const productsCount = cart.items.reduce(
    (acc, cur: ProductType) => (acc += cur?.quantity!),
    0
  );

  const handleCheckout = async () => {
    await fetch('http://localhost:4000/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: cart.items }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.url) {
          // Redirect
          window.location.assign(response.url);
        }
      });
  };

  return (
    <>
      <Navbar expand='sm'>
        <Navbar.Brand href='/'>eCommerce Store</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <Button onClick={() => setShow(true)}>
            Cart ({productsCount}) Items
          </Button>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productsCount > 0 ? (
            <>
              <p>Items in your cart:</p>
              {cart.items.map((item: ProductType) => {
                return (
                  <CartProduct
                    key={item.id}
                    id={item.id}
                    quantity={item.quantity}
                  />
                );
              })}
              <h1>Total: {cart.getTotalCost().toFixed(2)}€</h1>
              <Button onClick={handleCheckout} variant='success'>
                Purchase
              </Button>
            </>
          ) : (
            <h1>Your cart is empty!</h1>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};
