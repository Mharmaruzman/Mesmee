// Import necessary dependencies and models
const Attachment = require('../models/Attachment');
const asyncHandler = require('express-async-handler');

// @desc Get all attachments
// @route GET /attachments
// @access Public
const getAllAttachments = asyncHandler(async (req, res) => {
    // Retrieve all attachments from the database
    const attachments = await Attachment.find().lean();
    
    // Check if any attachments are found
    if (!attachments.length) {
        return res.status(404).json({ message: 'No attachments found' });
    }
    
    // Return the attachments as JSON response
    res.json(attachments);
});

// @desc Create new attachment
// @route POST /attachments
// @access Public
const createNewAttachment = asyncHandler(async (req, res) => {
    const { message, type, url } = req.body;

    // Create and store the new attachment
    const attachment = await Attachment.create({ message, type, url });

    if (attachment) {
        return res.status(201).json({ message: 'New attachment created', attachment });
    } else {
        return res.status(400).json({ message: 'Invalid attachment data received' });
    }
});

// @desc Update an attachment
// @route PATCH /attachments/:id
// @access Public
const updateAttachment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { message, type, url } = req.body;

    // Find the attachment by ID and update it with the new data
    const updatedAttachment = await Attachment.findByIdAndUpdate(
        id,
        { message, type, url },
        { new: true }
    ).lean();

    // Check if the attachment exists
    if (!updatedAttachment) {
        return res.status(404).json({ message: 'Attachment not found' });
    }

    // Send the updated attachment as a response
    res.json(updatedAttachment);
});

// @desc Delete an attachment
// @route DELETE /attachments/:id
// @access Public
const deleteAttachment = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Attachment ID required' });
    }

    // Confirm attachment exists to delete 
    const attachment = await Attachment.findById(id).exec();

    if (!attachment) {
        return res.status(404).json({ message: 'Attachment not found' });
    }

    const result = await attachment.deleteOne();

    const reply = `Attachment with ID ${result._id} deleted`;

    res.json(reply);
});

// Export the attachment controller functions
module.exports = {
    getAllAttachments,
    createNewAttachment,
    updateAttachment,
    deleteAttachment
};
