// Required imports
const Status = require('../models/Status');
const asyncHandler = require('express-async-handler');

// Handler for Status

// @desc Update a status
// @route PATCH /status/:id
// @access Private
const updateStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { newStatus } = req.body;

    try {
        // Check if ID is provided
        if (!id) {
            return res.status(400).json({ message: 'Status ID required' });
        }

        // Find the status by ID and update it with the new status
        const updatedStatus = await Status.findByIdAndUpdate(
            id,
            { status: newStatus },
            { new: true }
        ).lean();

        // Check if the status exists
        if (!updatedStatus) {
            return res.status(404).json({ message: 'Status not found' });
        }

        // Send the updated status as a response
        res.json(updatedStatus);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Exporting the function
module.exports = {
    updateStatus
};
