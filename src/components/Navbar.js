    import React from 'react';
import './Navbar.css';

const Navbar = ({ user, setView, onLogout }) => {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-logo-wrap" onClick={() => setView('home')}>
                    <div className="logo-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                    </div>
                    <div className="nav-logo">VoteVault</div>
                </div>
                <div className="nav-menu">
                    {user && (
                        <div className="nav-user-info">
                            <span className="user-email">{user.email}</span>
                            <span className="user-role">{user.role.toUpperCase()}</span>
                        </div>
                    )}

                    {user?.role === 'admin' && (
                        <div className="nav-dropdown">
                            <button className="dropdown-btn">Admin Panel ▾</button>
                            <div className="dropdown-menu">
                                <button onClick={() => setView('create')}>Create New Poll</button>
                                <button onClick={() => setView('delete')}>Delete Polls</button>
                                <button onClick={() => setView('home')}>View All Polls</button>
                            </div>
                        </div>
                    )}

                    {user && (
                        <button className="logout-btn" onClick={onLogout}>Log Out</button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
