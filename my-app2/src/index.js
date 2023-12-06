import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const myElement = (
  <div>
    <App></App>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')).render(myElement);

