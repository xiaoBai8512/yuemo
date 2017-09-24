var mysql= require("mysql");
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    database : 'sharetime'
});
connection.connect(function (err) {
    if(err){
        connection=mysql.createConnection(connection.config);
        connection.connect();
    }
});
module.exports = connection;
// mysql.query("UPDATE `users` SET `password` = '"+req.body.password+"' WHERE `users`.`userid` = "+result.userid,function (error, results, fields) {
//     info={
//         code:200,
//         message:"查看个人信息成功",
//         data:{
//
//         }
//
//     }