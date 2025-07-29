// frontend/src/main.jsx (ou index.jsx)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Ajuste o caminho se seu componente App estiver em src/components/App.jsx, por exemplo
import './styles/index.css'; // Opcional: importe seu CSS global se tiver

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

