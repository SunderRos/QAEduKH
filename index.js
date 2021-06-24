const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/adminRoutes')
const multer = require('multer')
const fileUpload = require('express-fileupload')
// const fileUpload = require('express-fileupload');
const http = require('http');
const socketio = require('socket.io')

const port = 3000;
const app = express();
const server = http.createServer(app)

// const io = socketio(server, {
//     cors: {
//       origin: "http://localhost:8080",
//       methods: ["GET", "POST"]
//     }
// });

//Meddleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());
// app.use(multer({dest:'../QAEduKH/client/src/assets'}).array('file'));
app.use(router);

//Connect to Mongodb
mongoose.connect('mongodb+srv://user12:12345@cluster0.xf9dt.mongodb.net/authvue?retryWrites=true&w=majority', {useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true}).then(result=>{
    console.log("DB is connected");
    server.listen(port);
}).catch(err=>{
    console.log(err);
})

//Run when client connect
// io.on('connection', socket=>{
//     console.log('new conection...');
//     socket.on('PostFeedback', ()=>{
//         io.emit('UpdateChat');
//     })

//     socket.on('PostComment',()=>{
//         io.emit('UpdateComment')
//     })
// });
