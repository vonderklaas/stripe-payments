import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { NavbarComponent } from './components/Navbar';

import { Store } from './pages/Store';
import { Cancel } from './pages/Cancel';
import { Success } from './pages/Success';

import { Routes, Route } from 'react-router-dom';

import { CartProvider } from './context/CartContext';

export const App = () => {
  return (
    <CartProvider>
      <Container>
        <NavbarComponent />
        <Routes>
          <Route path='/' element={<Store />} />
          <Route path='success' element={<Success />} />
          <Route path='cancel' element={<Cancel />} />
        </Routes>
      </Container>
    </CartProvider>
  );
};
