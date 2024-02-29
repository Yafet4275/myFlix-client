import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import './index.css';
import App from './App';
import { Container } from 'react-bootstrap';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Container className='px-3'>
    <App />
    </Container>
  </React.StrictMode>
);

