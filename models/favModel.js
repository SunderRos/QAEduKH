const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    favoriteList:[{
        blogTitle: {
            type: String,
            required: true,
        },
        addToListAt: {
            type: Date,
            required: true,
        }
    }],
}, {collection: 'favorites'});

const UserWatchList = mongoose.model('UserWatchList', UserSchema);
module.exports = UserWatchList;