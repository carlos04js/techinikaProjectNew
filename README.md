# 🚗 Tecchinika - Consultoria Automotiva

Bem-vindo ao repositório do projeto Tecchinika, uma plataforma web completa para **compra, venda e inspeção de veículos**, com foco em consultoria especializada e clientes credenciados.

---

## 💡 Visão Geral

Um sistema full-stack que conecta clientes interessados em adquirir ou vender veículos com consultores especializados, garantindo segurança e transparência em todo o processo.

## 🚀 Tecnologias Principais

### Frontend
-   **React:** Biblioteca JavaScript para construção da UI.
-   **Vite:** Ferramenta de build moderna e rápida.
-   **React Router DOM:** Para gerenciamento de rotas.
-   **Axios:** Cliente HTTP.
-   **CSS Puro:** Estilização.
-   **Node.js (v20.x):** Ambiente de execução.

### Backend
-   **Node.js (v18.x):** Ambiente de execução.
-   **Express:** Framework web para API RESTful.
-   **Sequelize:** ORM para interação com o banco de dados.
-   **SQLite3:** Banco de dados relacional leve.
-   **JWT & Bcrypt:** Autenticação e segurança.
-   **Nodemon:** Monitoramento de desenvolvimento.

---

## 📂 Estrutura do Repositório

Este é um monorepo, organizado em duas pastas principais:

-   `backend/`: Contém o código da API RESTful (servidor).
-   `frontend/`: Contém o código da aplicação React (interface do usuário).

## ▶️ Como Rodar o Projeto Localmente

Siga os passos abaixo para configurar e executar o projeto em sua máquina local.

### Pré-requisitos
-   Node.js (versão 20.x recomendada para frontend, 18.x para backend)
-   npm (gerenciador de pacotes do Node.js)
-   Git
-   **NVM (Node Version Manager):** Altamente recomendado para gerenciar múltiplas versões do Node.js, crucial para este projeto monorepo.
    -   **Linux/macOS:** Instale via `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash` (verifique a versão mais recente no GitHub).
    -   **Windows:** Baixe o instalador `nvm-setup.exe` de [coreybutler/nvm-windows releases](https://github.com/coreybutler/nvm-windows/releases). **Instale em um caminho SEM ESPAÇOS** (ex: `C:\nvm` e `C:\nodejs`).

### 1. Clonar o Repositório

```bash
git clone [https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git](https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git) # Substitua pelo link real do seu repositório
cd tecchinikaProjectNew # Navegue para a pasta raiz do projeto