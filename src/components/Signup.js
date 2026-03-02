import React, { useState } from 'react';
import '../utils/Auth.css';

const Signup = ({ onSignup, onSwitchToLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = onSignup(email, password, role);
        if (result.success) {
            alert("Signup successful! Please log in.");
            onSwitchToLogin();
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="auth-container fade-in">
            <div className="auth-card">
                <h2>Create Account</h2>
                <p>Join PulsePoll to share your voice and view results.</p>
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
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Role</label>
                        <div className="role-selector">
                            <label className={`role-option ${role === 'user' ? 'active' : ''}`}>
                                <input
                                    type="radio"
                                    name="role"
                                    value="user"
                                    checked={role === 'user'}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                                User
                            </label>
                            <label className={`role-option ${role === 'admin' ? 'active' : ''}`}>
                                <input
                                    type="radio"
                                    name="role"
                                    value="admin"
                                    checked={role === 'admin'}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                                Admin
                            </label>
                        </div>
                    </div>
                    {error && <p className="error-msg">{error}</p>}
                    <button type="submit" className="btn-primary auth-btn">Sign Up</button>
                </form>
                <p className="auth-footer">
                    Already have an account? <span onClick={onSwitchToLogin}>Log In</span>
                </p>
            </div>
        </div>
    );
};

export default Signup;
