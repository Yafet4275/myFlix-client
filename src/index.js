import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Container } from 'react-bootstrap';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Container className='px-0'>
    <App />
  </Container>
);

