// frontend/src/components/home/ServiceHighlights.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/ServiceHighlights.css'; // Vamos criar este arquivo CSS em seguida

const ServiceHighlights = () => {
  return (

    // Usa -se section ao inves de div para semântica, pois "DIV" não é semantico, é apenas para agrupar, é uma solução generica

    // Já "SECTION" tem siginificado semnatico, sendo uma seção de uma pagina , ou seja uma seção / componente que agrupo conteudo diferentes na mesma pagána os dividino em seção capitulos dessa página. 

    /* Use <div> para agrupamentos visuais ou funcionais que não adicionam significado estrutural ao conteúdo (ex: um container flexbox para um grupo de botões).

Use <section> para blocos de conteúdo tematicamente coesos e independentes que fazem parte da estrutura de tópicos da sua página (ex: "Seção Hero", "Seção de Serviços", "Seção de Depoimentos").*/

    <section className="service-highlights-section">
      <h2 className="service-highlights-headline">Nossos Serviços</h2>
      <p className="service-highlights-subtext">
        Conte com nossa expertise para todas as etapas do processo de compra e venda de veículos.
      </p>

      <div className="service-cards-container">
        {/* Card 1: Consultoria de Compra */}
        <div className="service-card">
          <div className="service-card-icon">🔍</div> {/* Placeholder para ícone */}
          <h3 className="service-card-title">Consultoria de Compra</h3>
          <p className="service-card-description">
            Assessoria completa para encontrar o veículo ideal de acordo com suas necessidades.
          </p>
        </div>

        {/* Card 2: Inspeção Pré-Compra */}
        <div className="service-card">
          <div className="service-card-icon">🚗</div> {/* Placeholder para ícone */}
          <h3 className="service-card-title">Inspeção Pré-Compra</h3>
          <p className="service-card-description">
            Avaliação técnica completa do veículo antes da aquisição para evitar surpresas desagradáveis.
          </p>
        </div>

        {/* Card 3: Assessoria de Venda */}
        <div className="service-card">
          <div className="service-card-icon">🤝</div> {/* Placeholder para ícone */}
          <h3 className="service-card-title">Assessoria de Venda</h3>
          <p className="service-card-description">
            Ajudamos você a vender seu veículo pelo melhor preço e com total segurança.
          </p>
        </div>
      </div>

      <Link to="/servicos" className="service-highlights-button">Ver Todos os Serviços →</Link>
    </section>
  );
};

export default ServiceHighlights;