const colors = require('colors');
const express = require('express'), 
      engine = require('ejs-mate'),
      app = express();
      
const port = 3000;
const path = require('path');

app.engine('ejs', engine);  
app.set('view engine', 'ejs');
app.use('/', express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.redirect('/TristanVarewijck');
})

app.get('/TristanVarewijck', (req, res) => {
  res.render('index', { what: 'best', who: 'me' });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})