// Required imports
const Conversation = require('../models/Conversation');
const asyncHandler = require('express-async-handler');

// Handler function

// @desc Update a conversation
// @route PATCH /conversations/:id
// @access Private
const updateConversation = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { participants } = req.body;

    try {
        // Check if ID is provided
        if (!id) {
            return res.status(400).json({ message: 'Conversation ID required' });
        }

        // Check if participants are provided
        if (!participants || participants.length < 2) {
            return res.status(400).json({ message: 'At least two participants are required' });
        }

        // Find the conversation by ID and update it with the new participants
        const updatedConversation = await Conversation.findByIdAndUpdate(
            id,
            { participants },
            { new: true }
        ).lean();

        // Check if the conversation exists
        if (!updatedConversation) {
            return res.status(404).json({ message: 'Conversation not found' });
        }

        // Send the updated conversation as a response
        res.json(updatedConversation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Exporting the function
module.exports = {
    updateConversation
};
