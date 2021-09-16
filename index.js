const bodyParser = require('body-parser')
const colors = require('colors');
const express = require('express'), 
      engine = require('ejs-mate'),
      app = express();
      
const port = 3000;
const path = require('path');
const Pusher = require('pusher'); 
const pusher = new Pusher({
  appId: "1268067",
  key: "b838f333e546486d5d14",
  secret: "203ba280cb762662871e",
  cluster: "eu",
}); 


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

app.get('/TristanVarewijck', (req, res) => {
  res.render('index');
})


//  COMMENTS 

// POST - comment 
app.post('/TristanVarewijck', (req, res) => {
   let newComment = {
     name: req.body.name, 
     email: req.body.email, 
     comment: req.body.comment, 
   }

   console.log(newComment)
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