var express = require('express');
var router = express.Router();
var mysql = require("./mysql");

router.get("/",function (req, res, next) {
    res.send("8569649686");
})

router.post("/postmessage",function (req, res, next){
    var info={};
    var kaiguan=true;
    var time=new Date().toLocaleString()
    console.log(req.body);
    console.log(new Date().toLocaleString());

    if(req.body.userid && req.body.username && req.body.title && req.body.article){

        mysql.query("SELECT * FROM `postmessage` WHERE `username` LIKE '"+req.body.username+"'",function (error, results, fields) {

                 if(results.length){
                     results.forEach(function (t) {
                         // console.log(t.article,t.title);
                         if(req.body.article==t.article&&req.body.title==t.title){
                            info={
                                code:3011,
                                message:"发布信息失败，内容重复",
                            }
                            kaiguan=false;

                            return;
                         }
                         else {
                             mysql.query("INSERT INTO `postmessage` (`userid`, `username`, `title`,`article`, `time`,`lng`,`lat`) VALUES ('" + req.body.userid + "', '" + req.body.username + "', '" + req.body.title + "', '" + req.body.article + "', '" + time + "','" + req.body.lng+ "','" + req.body.lat + "') ", function (error, results, fields) {
                                 // console.log(error);
                                 // console.log(results);
                                 info = {
                                     code: 200,
                                     message: "发布信息成功",
                                 }

                             })
                             res.send(info);
                             return;
                         }

                     })
                     res.send(info);
                 }


        })

    }
    else{
        info={
            code:3011,
            message:"发布信息失败，userid, username, title,article, 为必传字段 ",
        }
        res.send(info);
    }


})
router.post("/individualmessage",function (req, res, next){
    if(req.body.username){
    mysql.query("SELECT * FROM `postmessage` WHERE `username` LIKE '"+req.body.username+"' ORDER BY `time` DESC",function (error, results, fields){

        var info={
            code:200,
            message:"获取个人发布信息成功",
            data:results
        }
        res.send(info);
    })
    }
    else {
        var info={
            code:3012,
            message:"获取个人发布信息失败,请传入当前用户的username",

    }
        res.send(info);
    }
})
router.get("/allmessage",function (req, res, next){

        mysql.query("SELECT * FROM `postmessage` ORDER BY `time` DESC ",function (error, results, fields){
            console.log(results);
            var info={
                code:200,
                message:"获取全部发布信息成功",
                data:results
            }
            res.send(info);
        })
    //
    // else {
    //     var info={
    //         code:3012,
    //         message:"获取个人发布信息失败,请传入当前用户的username",
    //
    //     }
    //     res.send(info);
    // }
})
module.exports = router;