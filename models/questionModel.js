const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    questionAt: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, {collection: 'questions'});

const Question = mongoose.model('Question', UserSchema);
module.exports = Question