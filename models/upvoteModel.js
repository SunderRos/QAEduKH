const mongoose = require('mongoose')

const upvoteSchema = new mongoose.Schema({
    blogId: {
        type: String,
        required: true
    },
    rating: [{
        rateBy: {
            type: String,
            required: true
        },
        score: {
            type: Number,
            required: true,
            default: 0
        }
    }],
   overallRating: {
       type: Number,
   }
}, {collection: 'blogRatings'});

const blogRating = mongoose.model('blogRating', upvoteSchema)
module.exports = blogRating