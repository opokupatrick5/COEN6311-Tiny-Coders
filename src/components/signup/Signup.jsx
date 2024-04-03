import React, { useState } from 'react';
import './signup.css';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState(''); 

    return (
        <div className="signup-container"> 
            <form className="signup-form"> 
                <h2>Sign Up</h2>
                <div className="input-group">
                    <i className="fa-solid fa-user"></i>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <i className="fa-solid fa-user"></i>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <i className="fa-solid fa-envelope"></i>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <div className="input-group">
                    <i className="fa-solid fa-phone"></i>
                    <label htmlFor="phone">Phone Number:</label>
                    <input
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="role">Role:</label>
                    <select 
                        id="role" 
                        value={role} 
                        onChange={(e) => setRole(e.target.value)} 
                        required
                        className="formField"
                    >
                        <option value="">Select your role</option>
                        <option value="customer">Customer</option>
                        <option value="agent">Agent</option>
                        <option value="boss">Boss</option>
                    </select>
                </div>
                <button type="submit" className="signup-button">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
