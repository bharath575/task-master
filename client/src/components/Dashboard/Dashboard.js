import React, { useState, useEffect, useContext } from 'react';
import { tasksAPI } from '../../services/api';
import { socket } from '../../services/socket';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [filter, setFilter] = useState('all');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchTasks();

        socket.on('taskCreated', (newTask) => {
            setTasks((prev) => [newTask, ...prev]);
            toast.success('New task added by team member!');
        });

        socket.on('taskUpdated', (updatedTask) => {
            setTasks((prev) => prev.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
            toast.success('Task updated by team member!');
        });

        socket.on('taskDeleted', (taskId) => {
            setTasks((prev) => prev.filter((t) => t._id !== taskId));
            toast.success('Task deleted by team member!');
        });

        return () => {
            socket.off('taskCreated');
            socket.off('taskUpdated');
            socket.off('taskDeleted');
        };
    }, []);

    const fetchTasks = async () => {
        try {
            const { data } = await tasksAPI.getAll();
            setTasks(data);
        } catch (err) {
            toast.error('Failed to fetch tasks');
        }
    };

    const handleCreateTask = async (taskData) => {
        try {
            const { data } = await tasksAPI.create(taskData);
            setTasks([data, ...tasks]);
            setShowForm(false);
            socket.emit('taskCreated', data);
            toast.success('Task created!');
        } catch (err) {
            toast.error('Failed to create task');
        }
    };

    const handleUpdateTask = async (taskData) => {
        try {
            const { data } = await tasksAPI.update(editingTask._id, taskData);
            setTasks(tasks.map((t) => (t._id === data._id ? data : t)));
            setEditingTask(null);
            socket.emit('taskUpdated', data);
            toast.success('Task updated!');
        } catch (err) {
            toast.error('Failed to update task');
        }
    };

    const handleDeleteTask = async (taskId) => {
        if (window.confirm('Delete this task?')) {
            try {
                await tasksAPI.delete(taskId);
                setTasks(tasks.filter((t) => t._id !== taskId));
                socket.emit('taskDeleted', taskId);
                toast.success('Task deleted!');
            } catch (err) {
                toast.error('Failed to delete task');
            }
        }
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'all') return true;
        return task.status === filter;
    });

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>Welcome, {user?.name}!</h1>
                <button onClick={() => setShowForm(!showForm)} style={styles.addBtn}>
                    {showForm ? 'Cancel' : '+ New Task'}
                </button>
            </div>

            {(showForm || editingTask) && (
                <TaskForm
                    onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingTask(null);
                    }}
                    initialData={editingTask}
                />
            )}

            <div style={styles.filters}>
                <button
                    onClick={() => setFilter('all')}
                    style={filter === 'all' ? styles.activeFilter : styles.filterBtn}
                >
                    All ({tasks.length})
                </button>
                <button
                    onClick={() => setFilter('todo')}
                    style={filter === 'todo' ? styles.activeFilter : styles.filterBtn}
                >
                    To Do ({tasks.filter((t) => t.status === 'todo').length})
                </button>
                <button
                    onClick={() => setFilter('inprogress')}
                    style={filter === 'inprogress' ? styles.activeFilter : styles.filterBtn}
                >
                    In Progress ({tasks.filter((t) => t.status === 'inprogress').length})
                </button>
                <button
                    onClick={() => setFilter('done')}
                    style={filter === 'done' ? styles.activeFilter : styles.filterBtn}
                >
                    Done ({tasks.filter((t) => t.status === 'done').length})
                </button>
            </div>
            <div style={styles.taskList}>
                {filteredTasks.length === 0 ? (
                    <p style={styles.empty}>No tasks found. Create one to get started!</p>
                ) : (
                    filteredTasks.map((task) => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            onEdit={setEditingTask}
                            onDelete={handleDeleteTask}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: '100vh',
        background: '#f3f4f6',
        padding: '20px'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px'
    },
    title: {
        color: '#333',
        margin: 0
    },
    addBtn: {
        padding: '12px 24px',
        background: '#667eea',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '16px'
    },
    filters: {
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
        flexWrap: 'wrap'
    },
    filterBtn: {
        padding: '8px 16px',
        background: 'white',
        border: '1px solid #ddd',
        borderRadius: '5px',
        cursor: 'pointer'
    },
    activeFilter: {
        padding: '8px 16px',
        background: '#667eea',
        color: 'white',
        border: '1px solid #667eea',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold'
    },
    taskList: {
        maxWidth: '800px',
        margin: '0 auto'
    },
    empty: {
        textAlign: 'center',
        color: '#999',
        padding: '40px'
    }
};
export default Dashboard;