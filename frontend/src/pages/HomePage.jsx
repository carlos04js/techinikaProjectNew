// frontend/src/pages/HomePage.jsx
import React from 'react';
import Hero from '../components/home/Hero'; // <-- Importe o componente Hero

const HomePage = () => {
  return (
    // Um container simples para a Home Page.
    // O padding superior é para que o conteúdo não fique escondido sob a Navbar fixa.
    <div style={{ paddingTop: '70px', minHeight: 'calc(100vh - 70px)' }}> 
      <Hero /> {/* Renderize o componente Hero aqui */}
      {/* Outras seções da Home page virão aqui abaixo do Hero */}
    </div>
  );
};

export default HomePage;