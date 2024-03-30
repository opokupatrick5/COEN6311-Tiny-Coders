import React, { useState } from 'react';
import './Login.css'; 
import api from "../../services/api";
import { message } from 'antd';

const Login = ({ history }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('login/', { username, password });
            localStorage.setItem('userInfo', JSON.stringify(response.data));

            history.push('/dashboard/packages');
            window.location.reload()
        } catch (error) {
            // Handle login error
            message.error('Invalid credentials');
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="input-group">
                    <i className="fa-solid fa-user"></i>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <i className="fa-solid fa-lock"></i>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Sign In</button>
            </form>
        </div>
    );
};

export default Login;