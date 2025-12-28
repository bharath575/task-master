import React, { useState } from 'react';

function TaskForm({ onSubmit, onCancel, initialData = null }) {
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [status, setStatus] = useState(initialData?.status || 'todo');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, description, status });
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={styles.input}
            />
            <textarea
                placeholder="Task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={styles.textarea}
            />
            <select value={status} onChange={(e) => setStatus(e.target.value)} style={styles.select}>
                <option value="todo">To Do</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>
            </select>
            <div style={styles.buttons}>
                <button type="submit" style={styles.submitBtn}>
                    {initialData ? 'Update' : 'Create'} Task
                </button>
                <button type="button" onClick={onCancel} style={styles.cancelBtn}>
                    Cancel
                </button>
            </div>
        </form>
    );
}

const styles = {
    form: {
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        fontSize: '16px',
        boxSizing: 'border-box'
    },
    textarea: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        fontSize: '16px',
        minHeight: '80px',
        resize: 'vertical',
        boxSizing: 'border-box'
    },
    select: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        fontSize: '16px',
        boxSizing: 'border-box'
    },
    buttons: {
        display: 'flex',
        gap: '10px'
    },
    submitBtn: {
        flex: 1,
        padding: '10px',
        background: '#667eea',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold'
    },
    cancelBtn: {
        flex: 1,
        padding: '10px',
        background: '#ccc',
        color: '#333',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold'
    }
};

export default TaskForm;