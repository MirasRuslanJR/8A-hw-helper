// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';  // Импортируй компонент App

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Рендерим компонент в div с id="root"
);
