const express = require('express');
const router = express.Router();
const data = require('../lib/topic.js');

// study
router.get('/', function(req, res){
    data.studyHome(req, res);
});

router.get('/create', function(req, res){
    data.studyCreate(req, res);
});

router.post('/create_process', function(req, res){
    data.studyCreateProcess(req, res);
});

router.get('/update/:pageId', function(req, res){
    data.studyUpdate(req, res);
});

router.post('/update_process', function(req, res){
    data.studyUpdateProcess(req, res);
});

router.post('/delete', function(req, res){
    data.studyDelete(req, res);
});

router.get('/:pageId', function(req, res){
    data.studyTopic(req, res);
});

module.exports = router;