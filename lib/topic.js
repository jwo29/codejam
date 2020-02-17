const db = require('./db');
const template = require('./template');
var title = `What I'm studying`;

exports.studyHome = function(req, res){
    db.query(`SELECT * FROM study`, function(err, studyList){
        if(err){
            throw err;
        }
        
        var html = template.HTML(title,
        `
            <a href="/study/create">Create</a>
            ${template.list(studyList)}
        `, '', '', '');

        res.send(html);
    });
}

exports.studyTopic = function(req, res){
    db.query(`SELECT * FROM study`, function(err, studyList){
        if(err){
            throw err;
        }
        db.query(`SELECT * FROM study WHERE title=?`, [req.params.pageId],
        function(err, topic){
            if(err){
                throw err;
            }
            var html = template.HTML(title,
            `
            <a href="/study/create">Create</a>
            ${template.list(studyList)}
            `, topic[0].title,
            `
            <a href="/study/update/${topic[0].title}">Update</a>
            <form action="/study/delete" method="post">
                <input type="hidden" name="id" value="${topic[0].id}">
                <input type="submit" value="Delete">
            </form>
            `, template.detail(topic));
            res.send(html);
        });
    });
}

exports.studyCreate = function(req, res){
    db.query(`SELECT * FROM study`, function(err, studyList){
        if(err){
            throw err;
        }
        var html = template.HTML(title,
        `
        <a href="/study/create">Create</a>
        ${template.list(studyList)}
        `, '',
        `
        <form action="/study/create_process" method="post">
            <p><input type="text" name="title" placeholder="TITLE"></p>
            <p>
                <textarea name="description" placeholder="Description"></textarea>
            </p>
            <p><input type="submit"></p>
        </form>
        `, '');
        res.send(html);
    });
}

exports.studyCreateProcess = function(req, res){
    var post = req.body;
    db.query(`INSERT INTO study (title, description, created) VALUES (?, ?, NOW())`,
    [post.title, post.description], function(err){
        if(err){
            throw err;
        }
        res.redirect(`/study/${post.title}`);
    });
}

exports.studyUpdate = function(req, res){
    db.query('SELECT * FROM study', function(err, studyList){
        if(err){
            throw err;
        }
        db.query(`SELECT * FROM study WHERE title=?`,
        [req.params.pageId], function(err, topic){
            if(err){
                throw err;
            }
            var html = template.HTML(title,
            `
            <a href="/study/create">Create</a>
            ${template.list(studyList)}
            `, '',
            `
            <form action="/study/update_process" method="post">
                <input type="hidden" name="id" value="${topic[0].id}">
                <p><input type="text" name="title" placeholder="TITLE" value="${topic[0].title}"></p>
                <p>
                    <textarea name="description" placeholder="Description">${topic[0].description}</textarea>
                </p>
                <p><input type="submit" value="modify"></p>
            </form>
            `, '');
            res.send(html);
        });
    });
}

exports.studyUpdateProcess = function(req, res){
    var post = req.body;
    db.query(`UPDATE study SET title=?, description=? WHERE id=?`,
    [post.title, post.description, post.id], function(err){
        if(err){
            throw err;
        }
        res.redirect(`/study/${post.title}`);
    });
}

exports.studyDelete = function(req, res){
    var post = req.body;
    db.query(`DELETE FROM study WHERE id=?`,
    [post.id], function(err){
        if(err){
            throw err;
        }
        res.redirect('/study');
    })
}
