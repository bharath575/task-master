const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');


//Get all Tasks

router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find().populate('createdBy', 'name email').sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
})


// Create task

router.post('/', auth, async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const task = new Task({
            title,
            description,
            status: status || 'todo',
            createdBy: req.user.userId
        });
        await task.save();
        await task.populate('createdBy', 'name email');
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
})

// Update task

router.put('/:id',async (req,res) =>{
    try {
        const { title, description, status } = req.body;
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, status },
            { new: true }
        ).populate('createdBy', 'name email');

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    }catch (err){
        res.status(500).json({ message: 'Server error' });
    }
})


// Delete task
router.delete('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
})


module.exports = router;