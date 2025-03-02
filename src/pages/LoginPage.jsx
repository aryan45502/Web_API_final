// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { login } from '../api/authApi';
// import './AuthStyles.css';  // Use your custom CSS for maroon theme

// const LoginPage = ({ setUser }) => {
//     const [formData, setFormData] = useState({ email: '', password: '' });
//     const navigate = useNavigate();

//     const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const { token, user } = await login(formData);
//             localStorage.setItem('token', token);
//             setUser(user);
//             navigate(user.isAdmin ? '/admin/dashboard' : '/dashboard');
//         } catch (error) {
//             alert('Invalid credentials');
//         }
//     };

//     return (
//         <div className="auth-container">
//             <div className="auth-left">
//                 <h1>Plan Your Perfect Wedding</h1>
//                 <p>Join us to create memories that last a lifetime.</p>
//             </div>
//             <div className="auth-right">
//                 <h2 className="logo">LOGO</h2>
//                 <h3>Welcome Back</h3>
//                 <form onSubmit={handleSubmit}>
//                     <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
//                     <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//                     <button type="submit">Login</button>
//                 </form>
//                 <p>Don’t have an account? <a href="/register">Register now</a></p>
//             </div>
//         </div>
//     );
// };

// export default LoginPage;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { login } from '../api/authApi';
// import './AuthStyles.css';  // Ensure this contains the updated styles below

// const LoginPage = ({ setUser }) => {
//     const [formData, setFormData] = useState({ email: '', password: '' });
//     const navigate = useNavigate();

//     // Image Slideshow State
//     const [currentImage, setCurrentImage] = useState(0);

//     const images = [
//         '/images/wed1.jpg',  // Ensure these images exist in public/images/

//         '/images/wed3.jpeg'
//     ];

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentImage((prev) => (prev + 1) % images.length);
//         }, 1000);  // Auto-slide every 1 second
//         return () => clearInterval(interval);
//     }, []);

//     const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const { token, user } = await login(formData);
//             localStorage.setItem('token', token);
//             setUser(user);
//             navigate(user.isAdmin ? '/admin/dashboard' : '/dashboard');
//         } catch (error) {
//             alert('Invalid credentials');
//         }
//     };

//     return (
//         <div className="login-container">
//             {/* Slideshow Section (Left Side) */}
//             <div className="login-image-container">
//                 <img 
//                     src={images[currentImage]} 
//                     alt="Wedding" 
//                     className="slideshow-image"
//                 />
//             </div>

//             {/* Login Form Section (Right Side) */}
//             <div className="login-form-container">
//                 <div className="login-form">
//                     <h2 className="logo">LOGO</h2>
//                     <h3>Welcome Back</h3>
//                     <p>Please sign in to your account</p>

//                     <form onSubmit={handleSubmit}>
//                         <input
//                             type="email"
//                             name="email"
//                             placeholder="Email Address"
//                             onChange={handleChange}
//                             required
//                         />
//                         <input
//                             type="password"
//                             name="password"
//                             placeholder="Password"
//                             onChange={handleChange}
//                             required
//                         />
//                         <button type="submit">Sign In</button>
//                     </form>

//                     <p>Don’t have an account? <a href="/register">Register now</a></p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LoginPage;




// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { login } from '../api/authApi';
// import './AuthStyles.css';  // Use your custom CSS for maroon theme

// const LoginPage = ({ setUser }) => {
//     const [formData, setFormData] = useState({ email: '', password: '' });
//     const navigate = useNavigate();

//     const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const { token, user } = await login(formData);
//             localStorage.setItem('token', token);
//             setUser(user);
//             navigate(user.isAdmin ? '/admin/dashboard' : '/dashboard');
//         } catch (error) {
//             alert('Invalid credentials');
//         }
//     };

//     return (
//         <div className="auth-container">
//             <div className="auth-left">
//                 <h1>Plan Your Perfect Wedding</h1>
//                 <p>Join us to create memories that last a lifetime.</p>
//             </div>
//             <div className="auth-right">
//                 <h2 className="logo">LOGO</h2>
//                 <h3>Welcome Back</h3>
//                 <form onSubmit={handleSubmit}>
//                     <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
//                     <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//                     <button type="submit">Login</button>
//                 </form>
//                 <p>Don’t have an account? <a href="/register">Register now</a></p>
//             </div>
//         </div>
//     );
// };

// export default LoginPage;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authApi';

const LoginPage = ({ setUser }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [currentImage, setCurrentImage] = useState(0);
    const images = ['/images/wed1.jpg', '/images/wed3.png'];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { token, user } = await login(formData);
            localStorage.setItem('token', token);
            setUser(user);
            navigate(user.isAdmin ? '/admin/dashboard' : '/dashboard');
        } catch (error) {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="container">
            {/* Full-Page Background Photo */}
            <div className="background-slider">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`slide ${index === currentImage ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${img})` }}
                    />
                ))}
                <div className="gradient-overlay" />
            </div>

            {/* Centered Login Form */}
            <div className="auth-container">
                <div className="auth-card">
                    <div className="header">
                        <h1>Welcome Back</h1>
                        <p>Sign in to manage your wedding plans</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email Address"
                            />
                        </div>

                        <div className="input-group">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? '👁' : '👁🗨'}
                            </button>
                        </div>

                        <button type="submit" className="login-button">
                            Sign In
                        </button>
                    </form>

                    <div className="footer">
                        <p>New here? <a href="/register">Create account</a></p>
                        <a href="/forgot-password" className="forgot-password">Forgot password?</a>
                    </div>
                </div>
            </div>

            {/* Inline CSS */}
            <style jsx>{`
                :root {
                    --primary: #800000; /* Maroon */
                    --primary-dark: #5c0000; /* Darker maroon */
                    --accent: #ffcccb; /* Light maroon/pink */
                }

                .container {
                    display: flex;
                    justify-content: end;
                    align-items: center;
                    min-height: 100vh;
                    position: relative;
                    overflow: hidden;
                }

                .background-slider {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1;
                }

                .slide {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    background-size: cover;
                    background-position: center;
                    transition: opacity 1s ease-in-out;
                }

                .slide.active {
                    opacity: 1;
                }

                .gradient-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(45deg, rgba(128,0,0,0.7) 0%, rgba(92,0,0,0.5) 100%); /* Maroon gradient */
                }

                .auth-container {
                    position: relative;
                    z-index: 2;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    max-width: 400px;
                    padding: 2rem;
                }

                .auth-card {
                    width: 100%;
                    padding: 2.5rem;
                    background: rgba(255, 255, 255, 0.9); /* Semi-transparent white */
                    border-radius: 10px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
                    text-align: center;
                }

                .header {
                    margin-bottom: 1rem;
                    padding: 4px
                    
                }

                .header {
                    display: flex;
                    flex-direction: column; /* Stack items vertically */
                    align-items: center; /* Center the content horizontally */
                    text-align: center; /* Center the text within the container */
                    padding: 1.0rem; /* Add padding for better spacing */
                    background-color: #f8f9fa; /* Light background color */
                    border-radius: 8px; /* Slightly rounded corners */
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.0); /* Subtle shadow for depth */
                }

                .header h1 {
                    color: var(--primary-dark);
                    font-size: 1.5rem; /* Increased font size for emphasis */
                    margin-bottom: 0.001rem;
                    font-weight: bold; /* Make the heading bold */
                }

                .header p {
                    color: #666;
                    padding: 1rem;
                    font-size: 0.8rem; /* Slightly larger text for better readability */
                    line-height: 1.0; /* Improve readability with more line spacing */
                    max-width: 600px; /* Limit the paragraph width for better text flow */
                }


                .input-group {
                    position: relative;
                    margin-bottom: 1.0rem;
                }

                .input-group input {
                    width: 100%;
                    padding: 1rem;
                    border: 2px solid #f8f9fa;
                    border-radius: 10px;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                }

                .input-group input:focus {
                    border-color: var(--primary);
                    box-shadow: 0 0 0 3px rgba(128,0,0,0.1); /* Maroon focus shadow */
                }

                .password-toggle {
                    position: absolute;
                    right: 1rem;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    cursor: pointer;
                    opacity: 0.6;
                    padding: 0;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .login-button {
                    width: 100%;
                    padding: 1rem;
                    background: var(--primary);
                    color: white;
                    border: none;
                    border-radius: 10px;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }

                .login-button:hover {
                    background: var(--primary-dark);
                }

                .footer {
                    margin-top: 2rem;
                    border-radius: 10px;
                    text-align: center;
                    font-size: 0.9rem;
                    color: #666;
                }

                .footer a {
                    color: var(--primary);
                    text-decoration: none;
                    font-weight: 500;
                }

                .forgot-password {
                    display: block;
                    margin-top: 1rem;
                }

                @media (max-width: 768px) {
                    .auth-card {
                        padding: 2rem;
                        background: rgba(255, 255, 255, 0.95); /* More opaque on smaller screens */
                    }
                }
            `}</style>
        </div>
    );
};

export default LoginPage;
