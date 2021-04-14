const bodyParser = require('body-parser');
const express = require('express');
const mongodb = require('mongodb');
const path = require('path');
const MongoClient = mongodb.MongoClient;
const mongoUrl = 'mongodb://localhost:27017/kpp_test';
const urlencodedParser = bodyParser.urlencoded({extended: false});

const app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use('/static', express.static(__dirname + '/public'));

let mongo;
let counter_global;


MongoClient.connect(mongoUrl, { useUnifiedTopology: true }).then(function(client) {
    mongo = client.db();
}).catch(error => console.log(error.message));

app.get('/', function(request, response) {
    response.render('main_page');   
});

app.get('/edit', function(request, response) {
    response.render('edit_form', {head: 'head'});   
});

app.get('/open_tasks', function(request, response) {
    //let list = 
    console.log("open_f");
    mongo
    .collection('test')
    .find()
    .toArray()
    .then(function(tasks) {
        console.log(tasks);
        response.render('open_tasks', {data: tasks});   
  });
    
});

app.post('/edit', urlencodedParser, function (request, response) {
    
    console.log(request.body);
    mongo
    .collection('test')
    .insertOne({
        Name: request.body.name,
        Info: request.body.info,
        Dedline: request.body.deadline
    })
    .then(function() {
      console.log('Запис створено');
    });
    
    
    
});

app.listen(3000, function() {
    console.log('App started on http://localhost:3000');
});

