import React from 'react';
import './Header.css';

const Header = ({ view }) => {
    return (
        <header className="page-header">
            <h1>
                {view === 'home' && 'Interactive Polling'}
                {view === 'create' && 'Create Your Poll'}
                {view === 'delete' && 'Manage Polls'}
            </h1>
            <p>
                {view === 'home' && 'Vote and see real-time results instantly.'}
                {view === 'create' && 'Engage your audience with custom questions.'}
                {view === 'delete' && 'Delete any existing poll from the system.'}
            </p>
        </header>
    );
};

export default Header;
