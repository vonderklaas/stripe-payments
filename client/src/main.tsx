import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './styles/index.css';

import { BrowserRouter as Router } from 'react-router-dom';

const rootNode = document.getElementById('root');
ReactDOM.createRoot(rootNode as HTMLElement).render(
  <Router>
    <App />
  </Router>
);
