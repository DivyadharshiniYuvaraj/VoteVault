import React from 'react';
import './CreatePoll.css';

const CreatePoll = ({
    newQuestion,
    setNewQuestion,
    newOptions,
    handleOptionChange,
    addOptionField,
    removeOptionField,
    createPoll,
    setView
}) => {
    return (
        <section className="create-poll-card fade-in">
            <h2>New Poll</h2>
            <form onSubmit={createPoll}>
                <input
                    type="text"
                    placeholder="What's on your mind?"
                    className="question-input"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    required
                />
                <div className="options-container">
                    {newOptions.map((option, index) => (
                        <div key={index} className="option-row">
                            <input
                                type="text"
                                placeholder={`Option ${index + 1}`}
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                required
                            />
                            {newOptions.length > 2 && (
                                <button
                                    type="button"
                                    className="btn-delete-option"
                                    onClick={() => removeOptionField(index)}
                                    title="Remove option"
                                >
                                    &times;
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                <div className="form-actions">
                    <button type="button" className="btn-secondary" onClick={addOptionField}>
                        + Add Option
                    </button>
                    <div className="right-actions">
                        <button type="button" className="btn-cancel" onClick={() => setView('home')}>Cancel</button>
                        <button type="submit" className="btn-primary">Publish Poll</button>
                    </div>
                </div>
            </form>
        </section>
    );
};

export default CreatePoll;
