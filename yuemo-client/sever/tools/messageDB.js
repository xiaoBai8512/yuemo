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
function MessageDB() {

}
MessageDB.connection=connection;
MessageDB.query=function (sql,values) {

    return new Promise(function (succ,fail) {
        if (!sql) {
            fail({message: "没有传入sql"});
            return;
        }
        connection.query({
            sql:sql,
            values:values
        },function (err,result) {
            err?fail(err):succ(result);
        })
    })
    
}
module.exports=MessageDB;