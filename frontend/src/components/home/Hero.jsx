// frontend/src/components/home/Hero.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Hero.css'; // <-- IMPORTANTE: Importar o CSS aqui
import carroHeroImage from '../../assets/images/carroHero.png'; // <-- Importe sua imagem aqui com o nome do arquivo

const Hero = () => {
  return (
    <section className="hero-section"> {/* Usando classe CSS */}
      {/* Coluna de Conteúdo (Texto e Botões) */}
      <div className="hero-content-col"> {/* Usando classe CSS */}
        <p className="hero-sub-heading">Consultoria Automotiva Especializada</p>
        <h1 className="hero-headline">Encontre o veículo ideal para você</h1>
        <p className="hero-description">
          Somos especialistas em consultoria automotiva, auxiliando na compra e venda de veículos com segurança e transparência.
        </p>
        <div className="hero-button-container"> {/* Usando classe CSS */}
          <Link
            to="/veiculos"
            className="hero-button-primary" // Usando classe CSS
          >
            Ver Veículos →
          </Link>
          <Link
            to="/servicos"
            className="hero-button-secondary" // Usando classe CSS
          >
            Nossos Serviços
          </Link>
        </div>
      </div>

      {/* Coluna da Imagem e Boxes Especiais */}
      <div className="hero-image-col"> {/* Usando classe CSS */}
        {/* Imagem do Carro (Placeholder) */}
        <img
          src={carroHeroImage}
          alt="Veículo Ideal"
          className="hero-image" // Usando classe CSS
        />

        {/* Boxes Especiais (Consultoria e Clientes Satisfeitos) - como no mock-up */}
        <div className="hero-special-box-container"> {/* Usando classe CSS */}
          <div className="hero-special-box"> {/* Usando classe CSS */}
            <p className="hero-special-box-heading">Consultoria Especializada</p>
            <p className="hero-special-box-subtext">{/* Ícone ou texto adicional aqui */}</p>
          </div>
          <div className="hero-special-box"> {/* Usando classe CSS */}
            <p className="hero-special-box-text">100+</p>
            <p className="hero-special-box-subtext">Clientes Satisfeitos</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;