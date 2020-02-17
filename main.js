const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.use('/script', express.static(__dirname + '/script'));

const indexRouter = require('./routes/index.js');
const studyRouter = require('./routes/study.js');

app.use('/', indexRouter);
app.use('/study', studyRouter);

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
