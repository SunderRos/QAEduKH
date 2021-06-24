const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    feedbackTitle: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {collection: 'feedbacks'});

const Feedback = mongoose.model('Feedback', UserSchema);
module.exports = Feedback;