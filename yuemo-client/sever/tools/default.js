var DEFAULT = {};
// DEFAULT.ADD_USER_SQL="INSERT INTO `users` (`userid`, `username`, `phone`, `password`) VALUES (NULL, '"+req.body.username+"', '"+req.body.phone+"', '"+req.body.password+"')";
DEFAULT.CREAT_USER_SQL="CREATE TABLE `sharetime`.`users` ( `userid` BIGINT NOT NULL AUTO_INCREMENT , `username` VARCHAR(255) NOT NULL , `phone` VARCHAR(255) NOT NULL , `password` VARCHAR(255) NOT NULL , PRIMARY KEY (`userid`), UNIQUE (`username`), UNIQUE (`phone`))";

DEFAULT.LOGIN_USER_SQL=""

DEFAULT.toARR=function (obj) {
    var result=[];
    for(key in obj){
        result.push(obj[key]);
    }
    return result;
}

module.exports=DEFAULT;
