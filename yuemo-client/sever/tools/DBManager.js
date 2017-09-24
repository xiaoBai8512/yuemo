var DB=require("./messageDB");
var DEFAULT=require("./default");
function DBManager() {

}
DBManager.createUserTable=function () {
DB.query(DEFAULT.CREAT_USER_SQL).catch(function (err) {
throw err;
})
};
DBManager.addUser = function (userInfo) {
DB.query(DEFAULT.ADD_USER_SQL).then(function (res) {

}).catch(function (err) {

})
};

DBManager.searchUser = function () {};

DBManager.changeUserInfo = function () {};

DBManager.deleteUser = function () {};

module.exports=DBManager;