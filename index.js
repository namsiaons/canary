const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const handlebars = require('express-handlebars');
app.use(express.static('public'));
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "canaryb",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

});


const hbs = handlebars.create({
  layoutsDir: __dirname + '/views/layouts',
  extname: 'hbs'
});


app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');



app.use(express.static('public'))

app.get('/', function (req, res) {
  res.render('index'), {
    layout: "index"
  }
});


app.get('/signin', (req, res) => {
  res.render('signin'), {
    layout: "signin"
  }

});

app.get('/signup', (req, res) => {
  res.render('signup'), {
    layout: "signup"
  }

});
app.get('/profile/:username', (req, res) => {

  console.log(req.params.username);
  con.query("SELECT * FROM user where user_name=?", req.params.username, function (err, result, fields) {
    if (err) throw err;
    console.log(result);

    res.render('profile', {
      layout: 'index',
      userinfo: result
    });

  });
})

app.listen(3000);