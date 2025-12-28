import React, { useState, useContext } from 'react';

import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await authAPI.login({ email, password }); 
            login(data.user, data.token);
            toast.success('Login successful!');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Login to TaskMaster</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>Login</button>
                </form>
                <p style={styles.link}>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    )
} 


const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    card: {
        background: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        width: '100%',
        maxWidth: '400px'
    },
    title: {
        marginBottom: '30px',
        textAlign: 'center',
        color: '#333'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    input: {
        padding: '12px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        fontSize: '16px'
    },
    button: {
        padding: '12px',
        background: '#667eea',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        fontWeight: 'bold'
    },
    link: {
        marginTop: '20px',
        textAlign: 'center',
        color: '#666'
    }
};

export default Login;
