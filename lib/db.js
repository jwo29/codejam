const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dlwldn0313',
    database: 'codejam'
});
db.connect();
module.exports = db;