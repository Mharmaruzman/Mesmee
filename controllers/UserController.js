// Required imports
const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

// Handlers for User

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find().select('-password').lean();

        if (!users.length) {
            return res.status(404).json({ message: 'No users found' });
        }

        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    try {
        const { username, password, roles } = req.body;

        if (!username || !password || !Array.isArray(roles) || roles.length === 0) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const duplicate = await User.findOne({ username }).lean().exec();

        if (duplicate) {
            return res.status(409).json({ message: 'Duplicate username' });
        }

        const hashedPwd = await bcrypt.hash(password, 10);

        const user = await User.create({ username, password: hashedPwd, roles });

        if (user) {
            res.status(201).json({ message: `New user ${username} created` });
        } else {
            res.status(400).json({ message: 'Invalid user data received' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    try {
        const { id, username, roles, active, password } = req.body;

        if (!id || !username || !Array.isArray(roles) || roles.length === 0 || typeof active !== 'boolean') {
            return res.status(400).json({ message: 'All fields except password are required' });
        }

        const user = await User.findById(id).exec();

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const duplicate = await User.findOne({ username }).lean().exec();

        if (duplicate && duplicate._id.toString() !== id) {
            return res.status(409).json({ message: 'Duplicate username' });
        }

        user.username = username;
        user.roles = roles;
        user.active = active;

        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await user.save();

        res.json({ message: `${updatedUser.username} updated` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// @desc Delete a user
// @route DELETE /users/:id
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'User ID Required' });
        }

        const user = await User.findById(id).exec();

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const result = await user.deleteOne();

        const reply = `Username ${result.username} with ID ${result._id} deleted`;

        res.json(reply);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Exporting the functions
module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
};
