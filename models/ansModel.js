const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    questionId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    answerAt: {
        type: Date,
        required: true,
    }
}, {collection: 'answers'});

const UserAnswer = mongoose.model('UserAnswer', UserSchema);
module.exports = UserAnswer;