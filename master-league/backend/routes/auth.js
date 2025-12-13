import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';


const router = express.Router();
    router.post('/signup', async (req, res) =>  { 
        const { username, email, password, role } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ username, email, password: hashedPassword, role });
            await user.save();
            res.status(201).json({ message: 'User created successfully' });
        } catch (err) {
            res.status(400).json({ message: 'Error creating user', error: err.message });
        }   
    });
    router.post('/login' , async (req, res) => {
        const {username , password} = req.body;
    });
export default router;
    