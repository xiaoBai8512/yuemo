var express = require('express');
var mysql= require("mysql");
var router = express.Router();

/* GET home page. */
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    database : 'sharetime'
});
connection.connect();
var sql = "(UPDATE zhong_ishen_article SET chassid = 'mmp' WHERE checked = 1 ";
connection.query(sql, function (error, results, fields) {
    // if (error) throw error;
    // console.log('The solution is: ', results[0].solution);
});

// // connection.end();
router.post('/', function(req, res, next) {
    res.write("46546<b>888888</b>");
    res.write("hanjixin");
    res.write("hanjixin");
    res.write("hanjixin");
    res.send("This is shop");
});

module.exports = router;
