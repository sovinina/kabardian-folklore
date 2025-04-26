import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Admin.module.css'

export const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Ошибка авторизации');
        }

        localStorage.setItem('token', data.token);
        onLogin(); 
        navigate('/admin');
        } catch (err) {
        setError(err.message);
        }
    };

    return (
        <main>
        <h2>Авторизация</h2>
        <form className={styles.formLogin} onSubmit={handleLogin}>
            <input
            type="text"
            placeholder="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
            <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Войти</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        </main>
    );
}