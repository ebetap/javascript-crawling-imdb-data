const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const logger = require('morgan'); 
const connection = mysql.createConnection({
  host      : 'localhost',
  user      : 'root',
  password  : 'namamu',
  database  : 'db_imdb'
});

var app = express();
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({extended: false});
//buat koneksi
connection.connect((err) => {
  if(err) throw err;
  console.log('Mysql Connected');
});
//header
 app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.post('/insert/dbfilm',urlencodedParser,(req, res) => {
  var data = {
    title : req.body.title,
    year : req.body.year,
    category : req.body.category,
    rating : req.body.rating,
    desc : req.body.desc,
    votes : req.body.votes,
  }
  console.log(data);

  //PUSH INTO DATABASE
  connection.query('INSERT INTO first_mining SET ?',data,(err,result) => {
     console.log(result);
     console.log(err);
     var response = {
        status  : 200,
        success : result
     }
     res.end(JSON.stringify(response));
  });
});


app.listen('3000',()=>{
  console.log('Listening on port 3000');
});
