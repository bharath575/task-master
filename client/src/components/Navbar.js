import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) return null;

    return (
        <nav style={styles.nav}>
            <div style={styles.container}>
                <h2 style={styles.logo}>TaskMaster</h2>
                <div style={styles.right}>
                    <span style={styles.username}>{user.name}</span>
                    <button onClick={handleLogout} style={styles.logoutBtn}>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

const styles = {
    nav: {
        background: '#667eea',
        padding: '15px 20px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
    },
    logo: {
        color: 'white',
        margin: 0
    },
    right: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
    },
    username: {
        color: 'white',
        fontWeight: 'bold'
    },
    logoutBtn: {
        padding: '8px 16px',
        background: 'white',
        color: '#667eea',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold'
    }
};

export default Navbar;