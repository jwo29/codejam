const db = require('./db');
const template = require('./template');
exports.studyHome = function(req, res){
    db.query(`SELECT * FROM study`, function(err, studyList){
        if(err){
            throw err;
        }
        var html = template.HTML(
        `<div>
            <h2>What I'm studying</h2>
            <a href="/create">Create</a>
        </div>`,
        `<div>
            <div>${template.list(studyList)}</div>
        </div>`, '', '');

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
            var html = template.HTML(
            `<div>
                <h2>What I'm studying</h2>
                <a href="/create">Create</a>
            </div>`,
            `<div>
                <div>${template.list(studyList)}</div>
            </div>`,
            `<div>
                <a href="/update/${topic.title}">Update</a>
                <form action="/delete" method="post">
                    <input type="hidden" name="id" value="${topic.id}">
                    <input type="submit" value="Delete">
                </form>
            </div>`,
            `<div>
                <h2>${topic[0].title}</h2>
                <p>Created at ${topic[0].created}</p>
            </div>
            <div>
                <p>${topic[0].description}</p>
            </div>`);
            res.send(html);
        });
    });
}

exports.studyCreate = function(req, res){
    db.query(`SELECT * FROM study`, function(err, studyList){
        if(err){
            throw err;
        }
        var html = template.HTML(
        `<div>
            <h2>What I'm studying</h2>
            <a href="/create">Create</a>
        </div>`,
        `<div>
            <div>${template.list(studyList)}</div>
        </div>`, `
        <div>
            <form action="/create_process" method="post">
                <p><input type="text" name="title" placeholder="TITLE"></p>
                <p>
                    <textarea name="description" placeholder="Description"></textarea>
                </p>
                <p><input type="submit"></p>
            </form>
        </div>
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
            var html = template.HTML(`
            <div>
                <h2>What I'm studying</h2>
                <a href="/create">Create</a>
            </div>`,
            `<div>
                <div>${template.list(studyList)}</div>
            </div>`,`
            <div>
                <form action="/update_process" method="post">
                    <input type="hidden" name="id" value="${topic.id}">
                    <p><input type="text" name="title" placeholder="TITLE" value="${topic.title}"></p>
                    <p>
                        <textarea name="description" placeholder="Description">${topic.description}</textarea>
                    </p>
                    <p><input type="submit" value="modify"></p>
                </form>
            </div>
            `, '');
            res.send(html);
        });
    });
}

exports.studyUpdateProcess = function(req, res){
    var post = req.body;
    db.query(`UPDATE study SET title=?, description=? WHERE id=?`,
    [post.title, post.description, 7], function(err){
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