// Required imports
const GroupChat = require('../models/GroupChat');
const asyncHandler = require('express-async-handler');

// Handlers for GroupChat

// @desc Get all group chats
// @route GET /groupchats
// @access Private
const getAllGroupChats = asyncHandler(async (req, res) => {
    try {
        // Get all group chats from MongoDB
        const groupChats = await GroupChat.find().lean();

        // If no group chats 
        if (!groupChats?.length) {
            return res.status(404).json({ message: 'No group chats found' });
        }

        res.json(groupChats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// @desc Create new group chat
// @route POST /groupchats
// @access Private
const createNewGroupChat = asyncHandler(async (req, res) => {
    try {
        const { name, members } = req.body;

        // Confirm data
        if (!name || !members || !Array.isArray(members) || members.length === 0) {
            return res.status(400).json({ message: 'Group name and members are required' });
        }

        // Create and store the new group chat
        const groupChat = await GroupChat.create({ name, members });

        if (groupChat) {
            return res.status(201).json({ message: 'New group chat created', groupChat });
        } else {
            return res.status(400).json({ message: 'Invalid group chat data received' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// @desc Update a group chat
// @route PATCH /groupchats/:id
// @access Private
const updateGroupChat = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { name, members } = req.body;

        // Confirm data
        if (!id || !name || !members || !Array.isArray(members) || members.length === 0) {
            return res.status(400).json({ message: 'Group chat ID, name, and members are required' });
        }

        // Find the group chat by ID and update it with the new data
        const updatedGroupChat = await GroupChat.findByIdAndUpdate(
            id,
            { name, members },
            { new: true }
        ).lean();

        // Check if the group chat exists
        if (!updatedGroupChat) {
            return res.status(404).json({ message: 'Group chat not found' });
        }

        // Send the updated group chat as a response
        res.json(updatedGroupChat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// @desc Delete a group chat
// @route DELETE /groupchats/:id
// @access Private
const deleteGroupChat = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        // Confirm data
        if (!id) {
            return res.status(400).json({ message: 'Group chat ID required' });
        }

        // Confirm group chat exists to delete 
        const groupChat = await GroupChat.findById(id).exec();

        if (!groupChat) {
            return res.status(404).json({ message: 'Group chat not found' });
        }

        const result = await groupChat.deleteOne();

        const reply = `Group chat with ID ${result._id} deleted`;

        res.json(reply);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Exporting the functions
module.exports = {
    getAllGroupChats,
    createNewGroupChat,
    updateGroupChat,
    deleteGroupChat
};
