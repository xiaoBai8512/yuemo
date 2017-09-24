var express = require('express');
var router = express.Router();
var mysql = require("./mysql");
var alidayu = require("./alidayu")
var manageDB= require("../tools/DBManager");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// manageDB.createUserTable();
/**
 * request客户端发送给服务端的内容
 * response:反之
 */
router.post('/register', function(req, res, next) {
    console.log(req.body);
    var info={};
    var result=null;
    function judge(result) {
        //判断传入条件
        console.log(req.body.phone);

        if(!req.body.username||!req.body.password||!req.body.phone){
            info={
                code:3005,
                message:"注册失败，username,password,phone,为必传字段",
            }
        }

        else if(result.username!="undefined")
        {

            info={
                code:3006,
                message:"注册失败，用户名已存在",
            }
        }
        res.send(info);

    }
    mysql.query("SELECT * FROM `users` WHERE `username` LIKE '"+req.body.username+"'", function (error, results, fields) {
        result=results[0];
        if (results.length==0){

            var sql = "INSERT INTO `users` (`userid`, `username`, `phone`, `password`) VALUES (NULL, '"+req.body.username+"', '"+req.body.phone+"', '"+req.body.password+"')";

            mysql.query(sql, function (error, results, fields) {
                console.log(error);
                // if (error) throw error;
                // console.log('The solution is: ', results[0].solution);
            });
            info={

                code:200,
                message:"注册成功",
            }
            res.send(info);
        }
        else {

            judge(result);
        }

        // if (error) throw error;
        // console.log('The solution is: ', results[0].solution);

    });

  console.log(req.body);

  
});
router.post('/login',function (req, res, next) {
    console.log(req.body);
    var info={};
    var result=null;
    function login(result) {
        if(result.username ==req.body.username && result.password == req.body.password){
           info.code=200;
           info.message="登录成功";
            info.data={};

                info.data.userid=result.userid;
            info.data.username=result.username;

        }
        else {
            info={
                code:3007,
                message:"用户名或密码错误"
            }
        }
        res.send(info);
    }
    mysql.query("SELECT * FROM `users` WHERE `username` LIKE '"+req.body.username+"'", function (error, results, fields) {
        result=results[0];
        console.log(result)
        // if (error) throw error;
        // console.log('The solution is: ', results[0].solution);
        if(results.length==0){
            info={
                code:3007,
                message:"用户名或密码错误"
            }
            res.send(info);
        }
        else {
            login(result);
        }

    });
});
router.post('/findpassword', function(req, res, next) {
    var info={};
    var result=null;
    function findpassword() {
         mysql.query("UPDATE `users` SET `password` = '"+req.body.password+"' WHERE `users`.`userid` = "+result.userid,function (error, results, fields) {
             info={
                 code:200,
                 message:"找回密码成功"
             }
             res.send(info);
         })
    }
    mysql.query("SELECT * FROM `users` WHERE `username` LIKE '"+req.body.username+"'", function (error, results, fields) {
        result=results[0];
        console.log(result)
        // if (error) throw error;
        // console.log('The solution is: ', results[0].solution);
        if(results.length==0||req.body.username=="undefined"){
            info={
                code:3008,
                message:"用户名不存在"
            }
            res.send(info);
        }
        else {
          findpassword();
        }

    });
});
router.post('/lookinfo', function(req, res, next) {
    var info={};
    var result=null;
    function lookinfo() {
        mysql.query("UPDATE `users` SET `password` = '"+req.body.password+"' WHERE `users`.`userid` = "+result.userid,function (error, results, fields) {
            info={
                code:200,
                message:"查看个人信息成功",
                data:{

                }

            }
            res.send(info);
        })
    }
    mysql.query("SELECT * FROM `users` WHERE `username` LIKE '"+req.body.username+"'", function (error, results, fields) {
        result=results[0];
        console.log(result)
        // if (error) throw error;
        // console.log('The solution is: ', results[0].solution);
        if(results.length=0){
            info={
                code:3008,
                message:"用户名不存在"
            }
            res.send(info);
        }
        else {
            lookinfo();
        }

    });
});
router.get('/smscode',function(req, res, next){
    var code=parseInt(Math.random()*10)+""+parseInt(Math.random()*10)+parseInt(Math.random()*10)+parseInt(Math.random()*10)+parseInt(Math.random()*10)+parseInt(Math.random()*10);
    console.log(code);
    var info = req.query.phone?{
        code:200,
        message:"验证码发送成功",
        data:{code:code}
    }: {
        code: 3011,
        message: "手机号为空",
    }

    if(req.query.phone){
        console.log(req.query.phone)
        console.log("发送的验证码为："+code);
        alidayu.smsSend({
            sms_free_sign_name: '我的小秘书',
            sms_param: {"code": code, "product": "ST"},
            rec_num:req.query.phone,
            sms_template_code: 'SMS_60420032'
        },function () {
            console.log(arguments);
            res.send(info);
        });

    }

});


module.exports = router;

