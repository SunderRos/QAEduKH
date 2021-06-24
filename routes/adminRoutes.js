const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const jwt = require('jsonwebtoken')
const multer = require('multer')


const requireAuth = (req, res, next) =>{
    const token = req.headers.authorization;

    if(token){
        jwt.verify(token, 'secretkey', (err, decodedToken) =>{
            if(err){
                res.send({success: false})
            }
            else{
                next();
            }
        })
    }
    else{
        res.send({success: false});
    }
}

router.post('/addQuestion', adminController.addQuestion)
router.post('/login', adminController.login)
router.post('/register', adminController.register)
router.post('/addAnswer', adminController.addAnswer)
router.post('/addBlog', adminController.addBlog)
router.post('/editBlog', adminController.editBlog)
router.post('/blockUser', adminController.blockUser)
router.post('/unblockUser', adminController.unblockUser)
router.post('/addBlogRating', adminController.addBlogRating)
router.post('/updateOverallRating', adminController.updateOverallRating)
router.post('/getBlogRatingByBlogId', adminController.getBlogRatingByBlogId)
router.post('/addtoFavorite', adminController.addtoFavorite)
router.post('/getFavoriteByUserId', adminController.getFavoriteByUserId)
router.post('/getFavoriteUser', adminController.getFavoriteUser)
router.post('/removefromFavorite', adminController.removefromFavorite)
router.post('/addFeedback', adminController.addFeedback)
router.post('/getUserAnswerByQuestionId', adminController.getUserAnswerByQuestionId)
router.post('/getBlogRatingByBlogTitle', adminController.getBlogRatingByBlogTitle)
router.post('/getUserById', adminController.getUserById)
router.delete('/deleteUser', adminController.deleteUser)
router.delete('/deleteBlog', adminController.deleteBlog)
router.delete('/deleteQuestion', adminController.deleteQuestion)
router.delete('/deleteFeedback', adminController.deleteFeedback)


router.get('/getQuestion', adminController.getQuestion)
router.get('/getAnswer', adminController.getAnswer)
router.get('/getBlog', adminController.getBlog)
router.get('/getUser', adminController.getUser)
router.get('getScore', adminController.getScore)
router.get('/getBlogRating', adminController.getBlogRating)
router.get('/getFavorite', adminController.getFavorite)
router.get('/getFeedback', adminController.getFeedback)


module.exports = router