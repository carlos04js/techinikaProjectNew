// frontend/src/pages/Register.jsx
import React, { useState } from 'react';
import api from '../service/api'; // CONFIRME O CAMINHO PARA 'api.js'
import '../styles/Register.css'; // Vamos criar este arquivo CSS separado
import { Link } from 'react-router-dom';

function Register() {
    // Estados para os campos do formulário
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState(''); // Opcional, como no seu modelo User
    const [message, setMessage] = useState(''); // Para mensagens de sucesso/erro

    const handleSubmit = async (e) => {
        e.preventDefault(); // Previne o recarregamento da página

        setMessage(''); // Limpa a mensagem anterior

        try {
            // Chamada à API de registro no backend
            const response = await api.post('/auth/register', {
                firstName,
                lastName,
                username,
                email,
                password,
                address,
                phone // Envia o telefone, mesmo que opcional
            });

            console.log('Registro bem-sucedido!', response.data);
            setMessage('Registro realizado com sucesso! Você já pode fazer login.');
            
            // Opcional: Limpar formulário após sucesso
            setFirstName('');
            setLastName('');
            setUsername('');
            setEmail('');
            setPassword('');
            setAddress('');
            setPhone('');

            // Futuramente, pode redirecionar para a página de login automaticamente
            // import { useNavigate } from 'react-router-dom';
            // const navigate = useNavigate();
            // navigate('/login');

        } catch (error) {
            console.error('Erro no registro:', error);
            const errorMessage = error.response?.data?.message || 'Erro ao registrar. Tente novamente.';
            setMessage(errorMessage);
        }
    };

    return (
        <div className="register-container"> {/* Container principal */}
            <h2>Criar Nova Conta</h2>
            <form onSubmit={handleSubmit} className="register-form"> {/* Formulário */}
                
                <div className="form-group">
                    <label htmlFor="firstName">Nome:</label>
                    <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="form-input" />
                </div>
                
                <div className="form-group">
                    <label htmlFor="lastName">Sobrenome:</label>
                    <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="form-input" />
                </div>

                <div className="form-group">
                    <label htmlFor="username">Usuário:</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required className="form-input" />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-input" />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Senha:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="form-input" />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Endereço:</label>
                    <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required className="form-input" />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Telefone (Opcional):</label>
                    <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-input" />
                </div>

                <button type="submit" className="register-button">
                    Registrar
                </button>
            </form>

            {/* Atalho para a página de Login */}
            <p className="login-prompt">
                Já tem uma conta? <Link to="/login" className="login-link">Faça login aqui</Link>
            </p>

            {/* Mensagem de sucesso/erro */}
            {message && (
                <p className={`register-message ${message.includes('sucesso') ? 'success' : 'error'}`}>
                    {message}
                </p>
            )}
        </div>
    );
}

export default Register;