const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const template = require('./lib/template.js');
const db = require('./lib/db');
const data = require('./lib/topic.js');

app.use(bodyParser.urlencoded({extended: false}));

// home
app.get('/', function(req, res){
    var title = 'Welcome to CodeJam';
    var description = `
    <div>
        <div>
            <h3>Hi, Im jiwoo!</h3>
        </div>
        <div>
            <p>I'm a student in software mojor
            <br>and I'm interested in back-end development
            <br>blah blah...</p>
        </div>
        <div>
            <h3>Technology Stack</h3>
            <p>Back-end: Node.js</p>
            <p>Database: MySQL</p>
        </div>
    </div>
    `
    var html = template.HTML(
    '', `
    <div>
        <div>
            <h2>${title}</h2>
        </div>
        <div class="toDo>
            <! -- to do list -->
            <h2 id="toDo-title>to do list</h2>
            <form class="js-toDoForm">
                <input type="text" placeholder="write something to do">
            </form>
            <ul class="js-toDoList"></ul>
        </div>
    </div>
    `, '',
    `
    <div>
        <p>${description}</p>
    </div>
    `);
    res.send(html);
});

// study
app.get('/study/:pageId', function(req, res){
    data.studyTopic(req, res);
});

app.get('/study', function(req, res){
    data.studyHome(req, res);
});

app.get('/create', function(req, res){
    data.studyCreate(req, res);
});

app.post('/create_process', function(req, res){
    data.studyCreateProcess(req, res);
});

app.get('/update/:pageId', function(req, res){
    data.studyUpdate(req, res);
});

app.post('/update_process', function(req, res){
    data.studyUpdateProcess(req, res);
});

app.post('/delete', function(req, res){
    data.studyDelete(req, res);
});

// contact
app.get('/contact', function(req, res){
    
    res.send('Success');
})

app.use(function(req, res, next){
    res.status(404).send('Sorry cant find the page!');
  });
  
// err : next를 통해 전달받을 에러메세지
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, function(){
});