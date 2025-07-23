// frontend/src/components/layout/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Navbar.css'; // <-- IMPORTANTE: Importar o CSS aqui

const Navbar = () => {
  return (
    <nav className="navbar"> {/* Classe principal para o nav */}
      {/* Logo */}
      <Link to="/" className="navbar-logo"> {/* Classe para o logo */}
        <img src="https://via.placeholder.com/150x40/007bff/FFFFFF?text=Technika%20Automotiva"
             alt="TechnikaAutomotiva Logo"
             className="navbar-logo-img" /> {/* Classe para a imagem do logo */}
      </Link>

      {/* Links de Navegação */}
      <ul className="navbar-links"> {/* Classe para a lista de links */}
        <li><Link to="/" className="navbar-link">Home</Link></li>
        <li><Link to="/veiculos" className="navbar-link">Veículos</Link></li>
        <li><Link to="/busca" className="navbar-link">Busca</Link></li>
        <li><Link to="/servicos" className="navbar-link">Serviços</Link></li>
        <li><Link to="/contato" className="navbar-link">Contato</Link></li>
         {/* NOVOS LINKS DE LOGIN E REGISTRO */}
        <li><Link to="/login" className="navbar-link">Login</Link></li>
        <li><Link to="/register" className="navbar-link">Registrar</Link></li>
      </ul>

      {/* Botão "Fale Conosco" */}
      <Link to="/contato" className="navbar-button">Fale Conosco</Link>
    </nav>
  );
};

export default Navbar;