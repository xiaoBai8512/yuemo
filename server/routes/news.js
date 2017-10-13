var express = require('express');
var router = express.Router();
var mongoDB=require("./MGDB");
var DBMan=require("./DBManager");
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/publish', function(req, res, next) {
    if(!req.query.artical&&!req.query.username&&!req.query.id){
        res.send({
            code:3010,
            message:"发布失败"
        })
        return;
    }
    mongoDB.CON(function (arr,db) {
        DBMan.insertData(db,function () {
            var collection = db.collection('news');
            var data=[{userName:req.query.username,time:new Date().getTime(),headUrl:"http://ovre0qmr5.bkt.clouddn.com/21a7b687514832c5a6df7e350e00374b.jpg",artical:req.query.artical,imgUrl:""}]
            collection.insert(data, function(err, result) {

                if (err) {
                    console.log('Error:' + err);

                    return;
                }
                console.log(result);
                res.send({
                    code:200,
                    message:"发布成功"
                })
            });
        })
    })
});
router.get('/getInformation', function(req, res, next) {
    var info={};
    mongoDB.CON(function (arr,db) {

        DBMan.selectData(db,"news",function (collection) {

            var whereStr = {};
            collection.find(whereStr).toArray(function(err, result)
            {
                if(err)
                {
                    console.log('Error:'+
                        err);
                    return;
                }
                console.log(result);
                info.code=200;
                info.message="获取全部发布信息成功";
                info.data=result;
                res.send(info);
            });
        })
    })


});
module.exports=router;