// Required imports
const Notification = require('../models/Notification');
const asyncHandler = require('express-async-handler');

// Handler for Notification

// @desc Update a notification
// @route PATCH /notifications/:id
// @access Private
const updateNotification = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { read } = req.body;

        // Confirm data
        if (!id || read === undefined) {
            return res.status(400).json({ message: 'Notification ID and read status are required' });
        }

        // Find the notification by ID and update it with the new data
        const updatedNotification = await Notification.findByIdAndUpdate(
            id,
            { read },
            { new: true }
        ).lean();

        // Check if the notification exists
        if (!updatedNotification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        // Send the updated notification as a response
        res.json(updatedNotification);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Exporting the function
module.exports = {
    updateNotification
};
