import React from 'react';
import './DeletePolls.css';

const DeletePolls = ({ polls, deletePoll, setView }) => {
    return (
        <section className="delete-view fade-in">
            <h1>Delete Existing Polls</h1>
            {polls.length === 0 ? (
                <div className="empty-state">
                    <p>No polls available to delete.</p>
                    <button className="btn-primary" onClick={() => setView('home')}>Back to Home</button>
                </div>
            ) : (
                <div className="delete-list">
                    {polls.map(poll => (
                        <div key={poll.id} className="delete-item">
                            <div className="delete-info">
                                <h3>{poll.question}</h3>
                                <span>{poll.options.length} options • {poll.options.reduce((s, o) => s + o.votes, 0)} total votes</span>
                            </div>
                            <button className="btn-danger" onClick={() => deletePoll(poll.id)}>Delete</button>
                        </div>
                    ))}
                </div>
            )}
            <div className="center-actions" style={{ textAlign: 'center' }}>
                <button className="btn-secondary" style={{ marginTop: '30px' }} onClick={() => setView('home')}>Done</button>
            </div>
        </section>
    );
};

export default DeletePolls;
