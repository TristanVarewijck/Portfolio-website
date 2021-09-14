const bodyParser = require('body-parser')
const colors = require('colors');
const express = require('express'), 
      engine = require('ejs-mate'),
      app = express();
      
const port = 3000;
const path = require('path');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

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
  let newComment = req.body.comment; 
  // push to database
  console.log(newComment);

  res.render('index', {newComment}); 
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
app.post
// POST - from to email

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})