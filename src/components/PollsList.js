import React from 'react';
import './PollsList.css';

const PollsList = ({ polls, user, handleVote, getPercentage, setView }) => {
    return (
        <section className="polls-list fade-in">
            <h2 style={{ display: polls.length > 0 ? 'block' : 'none' }}>Active Polls</h2>
            {polls.length === 0 ? (
                <div className="empty-state">
                    <p>No polls available. Be the first to create one!</p>
                    {user?.role === 'admin' && <button className="btn-primary" onClick={() => setView('create')}>Create Poll</button>}
                </div>
            ) : (
                polls.map(poll => {
                    const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
                    const hasVoted = poll.voters?.includes(user?.id);

                    return (
                        <div key={poll.id} className="poll-card">
                            <h3>{poll.question}</h3>
                            <div className="options-list">
                                {poll.options.map((option, index) => {
                                    const percentage = getPercentage(option.votes, totalVotes);
                                    return (
                                        <div key={index} className="option-item">
                                            {hasVoted ? (
                                                <div className="result-view">
                                                    <div className="result-info">
                                                        <span>{option.text}</span>
                                                        <span>{percentage}% ({option.votes})</span>
                                                    </div>
                                                    <div className="progress-bar-container">
                                                        <div
                                                            className="progress-bar"
                                                            style={{ width: `${percentage}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <button
                                                    className="vote-button"
                                                    onClick={() => handleVote(poll.id, index)}
                                                >
                                                    {option.text}
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            {hasVoted && <p className="status-msg">Your vote has been recorded!</p>}
                            <p className="total-count">{totalVotes} total votes</p>
                        </div>
                    );
                })
            )}
        </section>
    );
};

export default PollsList;
