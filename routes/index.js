const express = require('express');
const router = express.Router();
const template = require('../lib/template.js');

// home
router.get('/', function(req, res){
    var title = 'Welcome to CodeJam';
    var subtitile = 'Hi Im jiwoo!';
    var description = `
    I'm a student in software major
    <br>and I'm interested in back-end development
    <br>blah blah...

    <h3>Technology Stack</h3>
    Back-end: Node.js
    <br>Database: MySQL`;

    var html = template.HTML(title, '', subtitile, '', description);
    
    res.send(html);
});

module.exports = router;