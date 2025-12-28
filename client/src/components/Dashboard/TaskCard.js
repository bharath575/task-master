import React from 'react';

function TaskCard({ task, onEdit, onDelete }) {
    const statusColors = {
        todo: '#fbbf24',
        inprogress: '#3b82f6',
        done: '#10b981'
    };

    const statusLabels = {
        todo: 'To Do',
        inprogress: 'In Progress',
        done: 'Done'
    };

    return (
        <div style={styles.card}>
            <div style={styles.header}>
                <h3 style={styles.title}>{task.title}</h3>
                <span style={{ ...styles.status, background: statusColors[task.status] }}>
                    {statusLabels[task.status]}
                </span>
            </div>
            {task.description && <p style={styles.description}>{task.description}</p>}
            <div style={styles.footer}>
                <small style={styles.author}>By: {task.createdBy?.name || 'Unknown'}</small>
                <div style={styles.actions}>
                    <button onClick={() => onEdit(task)} style={styles.editBtn}>Edit</button>
                    <button onClick={() => onDelete(task._id)} style={styles.deleteBtn}>Delete</button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    card: {
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        marginBottom: '15px'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px'
    },
    title: {
        margin: 0,
        color: '#333',
        fontSize: '18px'
    },
    status: {
        padding: '5px 12px',
        borderRadius: '15px',
        fontSize: '12px',
        fontWeight: 'bold',
        color: 'white'
    },
    description: {
        color: '#666',
        marginBottom: '15px'
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    author: {
        color: '#999'
    },
    actions: {
        display: 'flex',
        gap: '10px'
    },
    editBtn: {
        padding: '5px 15px',
        background: '#667eea',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px'
    },
    deleteBtn: {
        padding: '5px 15px',
        background: '#ef4444',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px'
    }
};

export default TaskCard;