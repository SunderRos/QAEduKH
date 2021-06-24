const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
  
    description: {
        type: String,
        required: true
    },
    writer: {
        type: String,
        required: true,
    },

    uploadAt: {
       type: String,
       required: true
    },
}, {collection: 'blogs'})

const Blog = mongoose.model('Blog', userSchema)
module.exports = Blog
