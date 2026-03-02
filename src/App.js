import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CreatePoll from './components/CreatePoll';
import DeletePolls from './components/DeletePolls';
import PollsList from './components/PollsList';
import Login from './components/Login';
import Signup from './components/Signup';
import { signup, login, verifyToken, logout } from './utils/auth';

function App() {
    // Auth state: null, 'login', or 'signup'
    const [authState, setAuthState] = useState('login');
    const [user, setUser] = useState(null);

    // State for view: 'home', 'create', or 'delete'
    const [view, setView] = useState('home');

    // State for all polls
    const [polls, setPolls] = useState(() => {
        const savedPolls = localStorage.getItem('polls');
        const initialPolls = savedPolls ? JSON.parse(savedPolls) : [
            {
                id: 1,
                question: "What is your favorite programming language?",
                options: [
                    { text: "JavaScript", votes: 5 },
                    { text: "Python", votes: 3 },
                    { text: "Java", votes: 2 }
                ],
                voters: [] // Add voters array to track who voted
            }
        ];
        // Ensure every poll has a voters array (data migration)
        return initialPolls.map(poll => ({
            ...poll,
            voters: poll.voters || []
        }));
    });

    // Check for existing token on mount
    useEffect(() => {
        const currentUser = verifyToken();
        if (currentUser) {
            setUser(currentUser);
            setAuthState(null);
        }
    }, []);

    // Save polls to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('polls', JSON.stringify(polls));
    }, [polls]);

    // Auth Handlers
    const handleSignup = (email, password, role) => {
        return signup(email, password, role);
    };

    const handleLogin = (email, password) => {
        const result = login(email, password);
        if (result.success) {
            setUser(result.user);
            setAuthState(null);
            setView('home');
        }
        return result;
    };

    const handleLogout = () => {
        logout();
        setUser(null);
        setAuthState('login');
    };

    // Poll Logic
    const [newQuestion, setNewQuestion] = useState("");
    const [newOptions, setNewOptions] = useState(["", ""]);

    const addOptionField = () => {
        setNewOptions([...newOptions, ""]);
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...newOptions];
        updatedOptions[index] = value;
        setNewOptions(updatedOptions);
    };

    const removeOptionField = (index) => {
        if (newOptions.length <= 2) return; // Keep at least 2 options
        const updatedOptions = newOptions.filter((_, i) => i !== index);
        setNewOptions(updatedOptions);
    };

    const createPoll = (e) => {
        e.preventDefault();
        if (user?.role !== 'admin') return;
        if (!newQuestion.trim() || newOptions.some(opt => !opt.trim())) return;

        const poll = {
            id: Date.now(),
            question: newQuestion,
            options: newOptions.map(opt => ({ text: opt, votes: 0 })),
            voters: []
        };

        setPolls([poll, ...polls]);
        setNewQuestion("");
        setNewOptions(["", ""]);
        setView('home');
    };

    const handleVote = (pollId, optionIndex) => {
        if (!user) return;

        const updatedPolls = polls.map(poll => {
            if (poll.id === pollId) {
                // Ensure voters array exists before calling includes
                const voters = poll.voters || [];
                if (voters.includes(user.id)) {
                    alert("You have already voted on this poll!");
                    return poll;
                }
                const updatedOptions = [...poll.options];
                updatedOptions[optionIndex].votes += 1;
                return { ...poll, options: updatedOptions, voters: [...voters, user.id] };
            }
            return poll;
        });

        setPolls(updatedPolls);
    };

    const deletePoll = (pollId) => {
        if (user?.role !== 'admin') return;
        if (window.confirm("Are you sure you want to delete this poll?")) {
            const updatedPolls = polls.filter(poll => poll.id !== pollId);
            setPolls(updatedPolls);
        }
    };

    const getPercentage = (votes, totalVotes) => {
        if (totalVotes === 0) return 0;
        return Math.round((votes / totalVotes) * 100);
    };

    // If not logged in, show Auth pages
    if (!user) {
        return (
            <div className="app-layout">
                <nav className="navbar">
                    <div className="nav-container">
                        <div className="nav-logo-wrap">
                            <div className="logo-icon">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                            </div>
                            <div className="nav-logo">VoteVault</div>
                        </div>
                    </div>
                </nav>
                <main className="container">
                    {authState === 'login' ? (
                        <Login
                            onLogin={handleLogin}
                            onSwitchToSignup={() => setAuthState('signup')}
                        />
                    ) : (
                        <Signup
                            onSignup={handleSignup}
                            onSwitchToLogin={() => setAuthState('login')}
                        />
                    )}
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="app-layout">
            <Navbar user={user} setView={setView} onLogout={handleLogout} />

            <main className="container">
                {view === 'create' && user.role === 'admin' && (
                    <CreatePoll
                        newQuestion={newQuestion}
                        setNewQuestion={setNewQuestion}
                        newOptions={newOptions}
                        handleOptionChange={handleOptionChange}
                        addOptionField={addOptionField}
                        removeOptionField={removeOptionField}
                        createPoll={createPoll}
                        setView={setView}
                    />
                )}

                {view === 'delete' && user.role === 'admin' && (
                    <DeletePolls
                        polls={polls}
                        deletePoll={deletePoll}
                        setView={setView}
                    />
                )}

                {view === 'home' && (
                    <PollsList
                        polls={polls}
                        user={user}
                        handleVote={handleVote}
                        getPercentage={getPercentage}
                        setView={setView}
                    />
                )}

                {/* Unauthorized fallback */}
                {(view === 'create' || view === 'delete') && user.role !== 'admin' && (
                    <div className="unauthorized fade-in">
                        <h2>Access Denied</h2>
                        <p>You do not have permission to access this page.</p>
                        <button className="btn-primary" onClick={() => setView('home')}>Back to Home</button>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}

export default App;
