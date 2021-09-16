const bodyParser = require('body-parser')
const colors = require('colors');
require('dotenv').config()
const express = require('express'), 
      engine = require('ejs-mate'),
      app = express();
      
const port = 3000;
const path = require('path');
const Pusher = require('pusher'); 
const pusher = new Pusher({
  appId: process.env.PUSHER_SECRET,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_ID,
  cluster: "eu",
}); 

// DATABASE connection
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("db-connected")
}

const commentSchema = new mongoose.Schema({
  name:{
    type: String, 
    // required: true, 
  }, 
  email: {
    type: String, 
    // required: true, 
  },
  comment: {
    type: String, 
    // required: true, 
  }
});

const Comment = mongoose.model('Comment', commentSchema);


// async function saveToDatabase(){
//   await newComment.save();
// }; 

// saveToDatabase())



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('ejs', engine);  
app.set('view engine', 'ejs');
app.use('/', express.static(path.join(__dirname, 'public')));

//  homepage
app.get('/', (req, res) => {
    res.redirect('/TristanVarewijck');
})

app.get('/TristanVarewijck', async(req, res) => {
  //  get all comments
  let allComments = await Comment.find({});
  console.log(allComments);
  res.render('index', allComments);
})


//  COMMENTS 

// POST - comment 
app.post('/TristanVarewijck',(req, res) => {
   
    let newComment = {
     name: req.body.name, 
     email: req.body.email, 
     comment: req.body.comment, 
   }

   pusher.trigger('flash-comments', 'new_comment', newComment); 
   res.json({created: true}); 
})

// GET - all comments
app.get('/TristanVarewijck', (req, res) => {
  // all comments from database
})

//  WORK

//  GET - all work
app.get('/TristanVarewijck', (req, res) => {
  
})

//  GET - 1 work piece
app.get('/TristanVarewijck/:id', (req, res) => {
})

// CONTACT FORM
// POST - from to email

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})


//  404 pages
app.use(function(req, res, next){
  let error404 = new Error('Route Not Found'); 
  error404.status = 404; 
  next(error404); 
});

module.exports = app; 