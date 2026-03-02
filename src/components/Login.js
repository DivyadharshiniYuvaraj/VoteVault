import React, { useState } from 'react';
import '../utils/Auth.css';

const Login = ({ onLogin, onSwitchToSignup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = onLogin(email, password);
        if (!result.success) {
            setError(result.message);
        }
    };

    return (
        <div className="auth-container fade-in">
            <div className="auth-card">
                <h2>Welcome Back</h2>
                <p>Log in to participate in polls and see real-time results.</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error-msg">{error}</p>}
                    <button type="submit" className="btn-primary auth-btn">Log In</button>
                </form>
                <p className="auth-footer">
                    Don't have an account? <span onClick={onSwitchToSignup}>Sign Up</span>
                </p>
            </div>
        </div>
    );
};

export default Login;
