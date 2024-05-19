import React, { useState } from 'react';
import api from './api';
import "./ForgotPassword.css";

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post('/forgot-password', { email });
        alert('Password reset email sent!');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button type="submit">Reset Password</button>
        </form>
    );
};

export default ForgotPasswordForm;
