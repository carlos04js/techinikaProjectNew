// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Importe suas páginas
import NavBar from './components/layout/NavBar';   // Ajuste o caminho se necessário
import Login from './pages/Login';
import Register from './pages/Register';
import CarList from './pages/CarList';
import HomePage from './pages/HomePage';

// Componente simples para a página inicial (Home)
// const HomePages = () => (
//     <div style={{ padding: '20px', textAlign: 'center' }}>
//         <h1>Bem-vindo ao Tecchinika!</h1>
//         <p>Seu destino para compra, venda  de carros de forma segura!</p>
//     </div>
// );

function App() {
  return (
    <Router>
      {/* Barra de Navegação */}
      <NavBar />

      {/* Comentado para evitar conflito com o Navbar */}
      {/* <nav style={{ padding: '10px', borderBottom: '1px solid #ccc', background: '#f8f8f8' }}>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', margin: 0, padding: 0 }}>
          <li><Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>Home</Link></li>
          <li><Link to="/login" style={{ textDecoration: 'none', color: 'blue' }}>Login</Link></li>
          <li><Link to="/register" style={{ textDecoration: 'none', color: 'blue' }}>Registrar</Link></li>
          <li><Link to="/cars" style={{ textDecoration: 'none', color: 'blue' }}>Ver Carros</Link></li>
        </ul>
      </nav> */}

      {/* Área onde as páginas serão renderizadas */}
      <div style={{ paddingTop: '70px' }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cars" element={<CarList />} />

        {/* Rota para lidar com páginas não encontradas (opcional) */}
        <Route path="*" element={<div style={{ padding: '20px', textAlign: 'center' }}><h2>404 - Página Não Encontrada</h2></div>} />
      </Routes>
      </div>
    </Router>
  
  );
}

export default App;