const User = require('../models/userModel')
const saltRounds = 10;
const bcrypt = require('bcrypt');
const path = require('path');
const jwt = require('jsonwebtoken')
const multer = require('multer')
const Blog = require('../models/blogModel')
const fs = require('fs')
const Question = require('../models/questionModel')
const Answer = require('../models/ansModel')
const bodyParser = require('body-parser')
const BlogRating = require('../models/upvoteModel')
const UserFavorite = require('../models/favModel')
const Feedback = require('../models/feedbackModel')

exports.register = (req, res)=>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    usernameEmpty = emailEmpty = passowrdEmpty = confirmPasswordEmpty = false;
    emailCheck =password_confirmPasswoedCheck= invalidPassword = false;
    uniqeEmail = true
    if(!username){
        usernameEmpty = true;
    }
    if(!email){
        emailEmpty = true;
    }
    if(!password){
        passowrdEmpty = true
    }
    if(!confirmPassword){
    confirmPasswordEmpty = true
    }
    if(password != confirmPassword){
        password_confirmPasswoedCheck = true
    }
    if(password.length<6){
        invalidPassword = true
    }
   
    
    
    if(usernameEmpty || emailEmpty || passowrdEmpty || confirmPasswordEmpty || password_confirmPasswoedCheck || invalidPassword){
        res.send({usernameEmpty, emailEmpty, passowrdEmpty, confirmPasswordEmpty, password_confirmPasswoedCheck, uniqeEmail, invalidPassword});
    }
    else{
        const hash = bcrypt.hashSync(password, saltRounds);
        const user = new User({
            username,
            email,
            password: hash,
            admin: false,
            block: false,
        })
        user.save().then(result=>{
            res.send({success: true, uniqeEmail})
        }).catch(err=>{
            if(err.code == 11000){
                res.send({uniqeEmail: false})
            }
            else{
                console.log(err);
            } 
        })
    }
}

exports.login = (req, res) =>{
    const email = req.body.email;
    const password = req.body.password;

    emailEmpty = passwordEmpty = false;
    isMatched = true
    if(!email){
        emailEmpty = true;
    }
    if(!password){
        passwordEmpty = true;
    }

    if(emailEmpty || passwordEmpty){
        res.send({emailEmpty, passwordEmpty, isMatched});
    }
    else{
        User.findOne({email: email}).then(result =>{
            if(result){
                if(!result.block){
                    if(bcrypt.compareSync(password, result.password)){
                        const token = jwt.sign({id: result._id}, 'secretkey');
                        res.send({success: true, isMatched, result, token: token});
                    }
                    else{
                        res.send({isMatched: false});
                    }
                }
                else{
                    res.send({block: true});
                }
                
            }
            else{
                res.send({isMatched: false});
            }
        })
    }
}

exports.addQuestion = (req, res) => {
    const username = req.body.username;
    const question = req.body.question;
    const userId = req.body.userId;
    const Questions = new Question({
        username,
        userId,
        question,
        questionAt: new Date().toDateString()
    });
    Questions.save().then(result => {
        res.send({success: true}, result);
    }).catch(err => {
        console.log(err);
    })
}

exports.getUser = (req, res) =>{
    User.find({}).then(result=>{
        res.send(result);
    }).catch(err =>{
        console.log(err);
    })
}

exports.getUserById = (req, res) => {
    const id = req.body.id;
    User.findById({_id: id}).then(result => {
        res.send(result)
    }).catch(err => {
        console.log(err)
    })
}

exports.blockUser = (req, res)=>{
    const id = req.body.id;
    User.findByIdAndUpdate({_id: id}, {block: true}).then(result=>{
        res.send({success: true});
    }).catch(err=>{
        console.log(err);
    })
}

exports.unblockUser = (req, res)=>{
    const id = req.body.id;
    User.findByIdAndUpdate({_id: id}, {block: false}).then(result=>{
        res.send({success: true})
    }).catch(err=>{
        console.log(err);
    })
}

exports.addAnswer = (req, res) => {
    const answer = req.body.answer;
    const username = req.body.username;
    const questionId = req.body.questionId;
    const userAnswers = new Answer({
        answer,
        username,
        questionId,
        answerAt: new Date().toDateString()
    });
    userAnswers.save().then(result=>{
        res.send({success: true, result});
    }).catch(err=>{
        console.log(err);
    })
}

// exports.postUserAnswer = (req, res)=>{
//     const questionId = req.body.questionId;
//     const answer = req.body.answer;
//     const username = req.body.username;

//     const userAnswers = new Answer({
//         questionId,
//         answer,
//         username,
//         answerAt: new Date().toDateString()
//     });
//     userAnswers.save().then(result=>{
//         res.send({success: true, result});
//     }).catch(err=>{
//         console.log(err);
//     })
// }

exports.getUserAnswerByQuestionId = (req, res) => {
    const questionId = req.body.questionId

    Answer.find({questionId: questionId}).then(result => {
        res.send(result)
    }).catch(err => {
        console.log(err)
    })
}
exports.getAnswer = (req, res) => {
    Answer.find({}).then(result => {
        res.send(result)
    }).catch(err => {
        console.log(err)
    })
}

exports.getQuestion = (req, res) => {
    Question.find({}).then(result => {
        res.send(result)
    }).catch(err => {
        console.log(err)
    })
}

exports.addBlog = (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const writer = req.body.writer;
    const file = req.files.file;
    const upvote = req.body.upvote
    const blog = new Blog({
        title,
        description,
        writer,
        upvote,
        uploadAt: new Date().toISOString()
    });
    blog.save().then(result => {
        fs.mkdirSync(`client/src/assets/blog/${result._id}`)
        fileUploadPath = path.join(__dirname, `../client/src/assets/blog/${result._id}/${result._id}.jpg`);
        file.mv(fileUploadPath);res.send({success: true});
    }).catch(err=>{
        if(err.code == 11000){
            res.send({success: false});
        }
        else{
            console.log(err);
        } 
    })
}

exports.getBlog = (req, res) =>{
    Blog.find({}).then(result=>{
        res.send(result)
    }).catch(err=>{
        console.log(err);
    })
}

exports.getBlogByTitle = (req, res) => {
    const Title = req.body.blogTitle
    Blog.findOne({Title: Title}).then(result => {
        res.send(result)
    }).catch(err => {
        console.log(err)
    })
}

exports.deleteBlog = (req, res)=>{
    const id = req.body.id;
    const title = req.body.title
   
    Blog.deleteOne({_id: id}).then(result=>{
        deletePath = path.join(__dirname, `../client/src/assets/blog/${id}`);
        fs.rmdir(deletePath, { recursive: true }, (err)=>{
            if(err){
                throw err;
            }
        });
        res.send(result);
    }).catch(err =>{
        console.log(err);
    })
}

exports.editBlog = (req, res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const writer = req.body.writer;
    const id = req.body.id;
    const upvote = req.body.upvote

    Blog.findByIdAndUpdate({_id: id}, {
        title,
        description,
        writer,
        upvote,
    }).then(result=>{
        if(!req.files){
            console.log('files')
        }
        else{
            if(Object.keys(req.files)[0] == "file"){
                fileUploadPath = path.join(__dirname, `../client/src/assets/movie/${id}/${id}.jpg`);
                req.files.file.mv(fileUploadPath);
            }
            else{
                fileUploadPath = path.join(__dirname, `../client/src/assets/blog/${id}/${id}.jpg`);
                req.files.file.mv(fileUploadPath);
            }
        }
        res.send({success: true});
    }).catch(err=>{
        if(err.code == 11000){
            res.send({success: false});
        }
        else{
            console.log(err)
        }
    })  
}

exports.deleteUser = (req, res) => {
    const id = req.body.id;

    User.findByIdAndDelete({_id: id}).then(result=>{
        res.send({success: true});
    }).catch(err=>{
        console.log(err);
    })
}


exports.getBlogRatingByBlogId = (req, res) => {
    const blogId = req.body.blogId;
    BlogRating.findById({_id: blogId}).then(result => {
        res.send(result)
    }).catch(err => {
        console.log(err)
    })
}
exports.getBlogRatingByBlogTitle = (req, res) => {
    const blogTitle = req.body.blogTitle;
    BlogRating.findOne({blogTitle: blogTitle}).then(result => {
        res.send(result)
    }).catch(err => {
        console.log(err)
    })
}

exports.deleteQuestion = (req, res) => {
    const id = req.body.id;

    Question.findByIdAndDelete({_id: id}).then(result => {
        res.send({success: true});
    }).catch(err => {
        console.log(err)
    })
}

// exports.addBlogRating = async (req, res) => {
//     const blogTitle = req.body.blogTitle;
//     const userId = req.body.userId;
//     const score = req.body.rating;
//     await BlogRating.findOne({blogTitle}).then(result => {
//         if(result) {
//             BlogRating.findByIdAndUpdate({"rating.rateBy": userId, blogTitle: blogTitle}, {$set: {"rating.$.score": score}}).then(result => {
//                 if(!result) {
//                     BlogRating.updateOne({blogTitle: blogTitle}, {$push: {rating: {rateBy: userId, score: score}}}).then(result => {
//                         res.send(result)
//                     }).catch(err => {
//                         console.log(err)
//                     })
//                 } else {
//                     res.send(result)
//                 }
//             })
//         } else {
//             const blogRating = new BlogRating({
//                 blogTitle,
//                 raing: {rateBy: userId, score: score},
//             });
//             blogRating.save().then(result => {
//                 res.send(result)
//             }).catch(err => {
//                 console.log(err)
//             })
//         }
//     })
// }
// exports.addBlogRating = (req, res) => {
//     const blogId = req.body.id;
//     const userId = req.body.userId
//     BlogRating.findById({_id: id}).then(result => {
//         if(result) {

//         } else {
//             const blogRating = new BlogRating({
//                 blogId,
//                 rating: {rateBy: id, score: 1}
//             });
//             blogRating.save().then(result => {
//                 console.log(result)
//             }).catch(err => {
//                 console.log(err)
//             })
//     }
// })
// }
exports.addBlogRating = async (req, res) => {
    const blogId = req.body.blogId;
    const userId = req.body.userId;
    const score = req.body.rating;
    await BlogRating.findOne({blogId}).then(result => {
        if(result) {
            BlogRating.findOneAndUpdate({"rating.rateBy": userId, blogId: blogId}, {$set: {"rating.$.score": score}}).then(result => {
                if(!result) {   
                    BlogRating.updateOne({blogId}, {$push: {rating: {rateBy: userId, score: score}}}).then(result => {
                        res.send(result)
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    res.send(result)
                }
            })
        } else {
            const blogRating = new BlogRating({
                blogId,
                rating: {rateBy: userId, score: score},
                overallRating: 1,
            });
            blogRating.save().then(result => {
                console.log(result)
            }).catch(err => {
                console.log(err)
            })
        }
    })
}
exports.updateOverallRating = (req, res)=>{
    const blogId = req.body.blogId;
    BlogRating.findOne({blogId: blogId}).then(result=>{
        var totalScore = 0;
        var overallRating = 0;
        result.rating.forEach(element=>{
            totalScore = totalScore + 1
        })

        overallRating = totalScore
        BlogRating.findOneAndUpdate({blogId: blogId}, {overallRating: overallRating}).catch(err=>{
            console.log(err)
        })
    
    });
   
}

exports.getScore = (req, res) => {
    const rating = req.body.rating
    BlogRating.find({"rating.score": score}).then(result => {
        res.send(result)
        console.log(result)
    }).catch(err => {
        console.log(err)
    })
}
exports.getBlogRating = (req, res)=>{
    BlogRating.find({}).then(result=>{
        res.send(result);
    }).catch(err=>{
        console.log(err);
    })
}
// exports.getBlogRatingByBlogTitle = (req, res)=>{
//     const blogTitle = req.body.blogTitle
//     BlogRating.find({blogTitle}).then(result=>{
//         res.send(result);
//     }).catch(err=>{
//         console.log(err);
//     })
// }
exports.addtoFavorite = (req, res)=>{
    const userId = req.body.userId;
    const blogTitle = req.body.blogTitle;
    UserFavorite.findOne({userId}).then(result=>{
        if(result){
            UserFavorite.findOne({userId: userId,"favoriteList.blogTitle": blogTitle}).then(result=>{
                if(!result){
                    UserFavorite.updateOne({userId}, {$push: {favoriteList: {blogTitle: blogTitle, addToListAt: new Date(),}}}).then(result=>{
                        res.send({exist: false})
                    }).catch(err=>{
                        console.log(err);
                    })
                }
                else{
                    res.send({exist: true})
                }
            })
            
        }
        else{
            const userFavorite = new UserFavorite({
                userId,
                favoriteList: {
                    blogTitle,
                    addToListAt: new Date(),
                }
            })
        
            userFavorite.save().then(result=>{
                res.send({exist: false})
            }).catch(err=>{
                console.log(err)
            })
        }
    })
}

exports.getFavorite = (req, res) => {
    UserFavorite.find({}).then(result => {
        res.send(result);
    }).catch(err => {
        console.log(err)
    })
}
exports.getFavoriteUser = (req, res) => {
    const userId = req.body.userId;
    UserFavorite.findOne({userId: userId}).then(result => {
        res.send(result);
    }).catch(err => {
        console.log(err)
    })
}

exports.getFavoriteByUserId = (req, res) => {
    const id = req.body.id;
    UserFavorite.findById({_id: id}).then(result => {
        res.send(result);
    }).catch(err => {
        console.log(err)
    })
}

exports.removefromFavorite = (req, res) => {
    const blogTitle = req.body.blogTitle;
    UserFavorite.findOneAndUpdate({"favoriteList.blogTitle": blogTitle}, {$pull: {favoriteList: {blogTitle: blogTitle}}}).then(result => {
        res.send(result);
        console.log(result)
    }).catch(err => {
        console.log(err)
    })
}

exports.addFeedback = (req, res) => {
    const userId = req.body.userId;
    const username = req.body.username;
    const feedbackTitle = req.body.feedbackTitle;
    const message = req.body.message;
    const feedback = new Feedback({
        userId,
        username,
        feedbackTitle,
        message
    });
    feedback.save().then(result => {
        res.send(result)
    }).catch(err => {
        console.log(err)
    })
}

exports.getFeedback = (req, res) => {
    Feedback.find({}).then(result => {
        res.send(result)
    }).catch(err => {
        console.log(err)
    })
}
exports.deleteFeedback = (req, res) => {
    const id = req.body.id;

    Feedback.findByIdAndDelete({_id: id}).then(result => {
        res.send({success: true});
    }).catch(err => {
        console.log(err)
    })
}