// Required imports
const Friendship = require('../models/Friendship');
const asyncHandler = require('express-async-handler');

// Handlers for Friendship

// @desc Get all friendships
// @route GET /friendships
// @access Private
const getAllFriendships = asyncHandler(async (req, res) => {
    try {
        // Get all friendships from MongoDB
        const friendships = await Friendship.find().lean();

        // If no friendships 
        if (!friendships?.length) {
            return res.status(404).json({ message: 'No friendships found' });
        }

        res.json(friendships);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// @desc Create new friendship
// @route POST /friendships
// @access Private
const createNewFriendship = asyncHandler(async (req, res) => {
    try {
        const { user1, user2, status } = req.body;

        // Confirm data
        if (!user1 || !user2 || !status) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check for existing friendship
        const existingFriendship = await Friendship.findOne({ $or: [{ user1, user2 }, { user1: user2, user2: user1 }] }).lean().exec();

        if (existingFriendship) {
            return res.status(409).json({ message: 'Friendship already exists' });
        }

        // Create and store the new friendship
        const friendship = await Friendship.create({ user1, user2, status });

        if (friendship) {
            return res.status(201).json({ message: 'New friendship created', friendship });
        } else {
            return res.status(400).json({ message: 'Invalid friendship data received' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// @desc Delete a friendship
// @route DELETE /friendships/:id
// @access Private
const deleteFriendship = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        // Confirm data
        if (!id) {
            return res.status(400).json({ message: 'Friendship ID required' });
        }

        // Confirm friendship exists to delete 
        const friendship = await Friendship.findById(id).exec();

        if (!friendship) {
            return res.status(404).json({ message: 'Friendship not found' });
        }

        const result = await friendship.deleteOne();

        const reply = `Friendship with ID ${result._id} deleted`;

        res.json(reply);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// @desc Update a friendship
// @route PATCH /friendships/:id
// @access Private
const updateFriendship = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Confirm data
        if (!id || !status) {
            return res.status(400).json({ message: 'Friendship ID and status are required' });
        }

        // Find the friendship by ID and update its status
        const updatedFriendship = await Friendship.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedFriendship) {
            return res.status(404).json({ message: 'Friendship not found' });
        }

        res.json({ message: 'Friendship updated successfully', friendship: updatedFriendship });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Exporting the functions
module.exports = {
    getAllFriendships,
    createNewFriendship,
    deleteFriendship,
    updateFriendship
};
