import React from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { ProductType } from '../types';

interface ProductProps {
  product: ProductType;
}

export const Product = ({ product }: ProductProps) => {
  const cart = useContext(CartContext);
  const productQuantity = cart.getProductQuantity(product.id);

  return (
    <Card className='m-2'>
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text>{product.price}€</Card.Text>
        {productQuantity > 0 ? (
          <>
            <Form as={Row}>
              <Form.Label column={true} sm='6'>
                In Cart: {productQuantity}
              </Form.Label>
              <Col sm='6'>
                <Button
                  onClick={() => cart.addOneToCart(product)}
                  className='mx-2'
                >
                  +1
                </Button>
                <Button
                  onClick={() => cart.removeOneFromCart(product.id)}
                  className='mx-2'
                >
                  -1
                </Button>
              </Col>
            </Form>
            <Button
              onClick={() => cart.deleteFromCart(product.id)}
              variant='danger'
              className='my-2'
            >
              Remove from Cart
            </Button>
          </>
        ) : (
          <Button onClick={() => cart.addOneToCart(product)} variant='primary'>
            Add to Cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};
