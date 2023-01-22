import { Row, Col } from 'react-bootstrap';
import React from 'react';
import { products } from '../data';

import { Product } from '../components/Product';
import { ProductType } from '../types';

export const Store = () => {
  return (
    <div>
      <h1>Welcome!</h1>
      <Row xs={1} md={3}>
        {products.map((product: ProductType) => {
          return (
            <Col align='center' key={product.id}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
