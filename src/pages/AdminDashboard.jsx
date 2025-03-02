import React from 'react';

const AdminDashboard = ({ setUser }) => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <div style={styles.container}>
            {/* Header */}
            <header style={styles.header}>
                <h2 style={styles.heading}>Admin Dashboard</h2>
                <button onClick={handleLogout} style={styles.logoutButton}>
                    Logout
                </button>
            </header>

            {/* Navigation */}
            <nav style={styles.nav}>
                <a href="/admin/services" style={styles.navLink}>
                    Manage Services
                </a>
                <a href="/admin/bookings" style={styles.navLink}>
                    Manage Bookings
                </a>
            </nav>

            {/* Welcome Message */}
            <div style={styles.welcomeMessage}>
                <p>Welcome back! Manage your services and bookings with ease.</p>
            </div>
        </div>
    );
};

// Inline Styles
const styles = {
    container: {
        padding: '40px',
        maxWidth: '1200px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px',
        paddingBottom: '20px',
        borderBottom: '1px solid #ddd',
    },
    heading: {
        fontSize: '2.5rem',
        color: '#333',
        margin: '0',
        fontWeight: '600',
    },
    logoutButton: {
        backgroundColor: '#800000', // Maroon
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        padding: '8px 16px', // Smaller padding
        cursor: 'pointer',
        fontSize: '0.9rem', // Smaller font size
        fontWeight: '500',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
    },
    logoutButtonHover: {
        backgroundColor: '#5c0000', // Darker maroon
        transform: 'translateY(-2px)',
    },
    nav: {
        display: 'flex',
        gap: '30px',
        marginBottom: '40px',
    },
    navLink: {
        textDecoration: 'none',
        color: '#800000', // Maroon
        fontSize: '1.2rem',
        fontWeight: '500',
        transition: 'color 0.3s ease, transform 0.2s ease',
    },
    navLinkHover: {
        color: '#5c0000', // Darker maroon
        transform: 'translateY(-2px)',
    },
    welcomeMessage: {
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    welcomeText: {
        fontSize: '1.1rem',
        color: '#555',
        margin: '0',
    },
};
   

export default AdminDashboard;
