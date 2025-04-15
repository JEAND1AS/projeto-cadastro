import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from "./pages/Home/index.jsx"; // Certifique-se que esse caminho está correto
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
);