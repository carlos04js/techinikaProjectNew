// frontend/src/pages/Login.jsx
import React, { useState } from 'react';
import api from '../service/api'; // CONFIRME QUE O CAMINHO PARA 'api.js' ESTÁ CORRETO
import '../styles/Login.css'; // <-- IMPORTANTE: Importar o CSS aqui
import { Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // Para exibir mensagens ao usuário

    const handleSubmit = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão de recarregar a página ao submeter

        setMessage(''); // Limpa a mensagem anterior ao tentar novamente

        try {
            // Chamada à API de login no backend
            const response = await api.post('/auth/login', { email, password });

            console.log('Login bem-sucedido!', response.data);

            // Armazenar o token e dados do usuário no localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            setMessage('Login realizado com sucesso! Redirecionando...');
            // Futuramente, você pode usar 'react-router-dom' para redirecionar o usuário:
            // import { useNavigate } from 'react-router-dom';
            // const navigate = useNavigate();
            // navigate('/'); // Exemplo: redireciona para a Home
            
        } catch (error) {
            console.error('Erro no login:', error);
            // Mensagens de erro mais amigáveis baseadas na resposta do backend
            const errorMessage = error.response?.data?.message || 'Erro ao fazer login. Tente novamente.';
            setMessage(errorMessage);
        }
    };

    return (
        <div className="login-container"> {/* Usando classe CSS */}
            <h2>Acessar Conta</h2>
            <form onSubmit={handleSubmit} className="login-form"> {/* Usando classe CSS */}
                <div className="form-group"> {/* Usando classe CSS */}
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-input" // Usando classe CSS
                    />
                </div>
                <div className="form-group"> {/* Usando classe CSS */}
                    <label htmlFor="password">Senha:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-input" // Usando classe CSS
                    />
                </div>
                <button type="submit" className="login-button"> {/* Usando classe CSS */}
                    Entrar
                </button>
            </form>
            <p className = "Register-prompt">
              Não tem conta? <Link to ="/register" className = "register-link" >Registre-se aqui</Link>
            </p>

            {message && (
                <p className={`login-message ${message.includes('sucesso') ? 'success' : 'error'}`}> {/* Usando classe CSS e classes condicionais */}
                    {message}
                </p>
            )}
        </div>
    );
}

export default Login;