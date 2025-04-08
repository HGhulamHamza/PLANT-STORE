// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './font.css';  // Import font styles first
import './index.css';   // Import other global styles
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
