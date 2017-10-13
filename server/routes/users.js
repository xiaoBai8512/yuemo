var express = require('express');
var router = express.Router();
var mongoDB=require("./MGDB");
var DBMan=require("./DBManager");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function(req, res, next) {
    console.log(req.body);
    var info={};
    var result=null;
    if(!req.body.username||!req.body.password||!req.body.phone){
        info={
            code:3005,
            message:"注册失败，username,password,phone,为必传字段",

        }
        res.send(info);
        return;
    }
    mongoDB.CON(function (err,db) {
        DBMan.insertData(db,function () {
            db.collection("users").createIndexes([
                {
                    key: { userName:1},
                    background: true,
                    sparse: true,
                    unique: true,
                },
            ]);
            var collection = db.collection('users');
            //插入数据
            var data = [{"userName":req.body.username,"password":req.body.password,"phone":req.body.phone}];
            // var data=[{"userName":"hanjixin","password":"123456","phone":"15501259989"}];
            collection.insert(data, function(err, result) {

                if(err)
                {
                    console.log('Error:'+ err);
                    if( err.code==11000)
                        res.send({
                            code :3007,
                            message:"用户名已存在"
                        })
                    return;
                }
                console.log(result)
                res.send({
                    code:200,
                    message:"注册成功"
                })
                
            });
        })
    })

    console.log(req.body);


});
router.post('/login',function (req, res, next) {
    console.log(req.body);
    var info={};
    var result=null;
     if(!req.body.username||!req.body.password){
         info={
             code:3007,
             message:"用户名或密码错误"
         }
         res.send(info);
         return;
     }
    mongoDB.CON(function (err,db) {
        DBMan.selectData(db,"users",function (collection) {
            var whereStr = {userName:req.body.username};
            collection.find(whereStr).toArray(function(err, result)
            {
                if(err)
                {
                    console.log('Error:'+
                        err);
                    return;
                }
                console.log(result);
                if (!result.length){
                    info={
                        code:3007,
                        message:"用户名或密码错误"
                    }
                }
                else {
                    if (result[0].password == req.body.password){
                    info.code=200;
                    info.message="登录成功";
                    info.data=result[0];
                    }
                    else {
                        info={
                            code:3007,
                            message:"用户名或密码错误"
                        }
                    }
                }
                res.send(info);
            });
        })
    })
});
router.post('/findpassword', function(req, res, next) {
    var info={};
    var result=null;
    res.send({
        code:404,
        message:"接口未开放，请联系管理员"
    })
});
router.post('/updateinfo', function(req, res, next) {
    var imgData = req.body.imgData;
    // 构建图片名
    var fileName = req.body.userid + '.png';
    // 构建图片路径
    var filePath = './img/' + fileName;
    //过滤data:URL
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    fs.writeFile(filePath, dataBuffer, function(err) {
        if(err){
            res.end(JSON.stringify({status:'102',msg:'文件写入失败'}));
        }else{
            //生成上传
            var putPolicy = new qiniu.rs.PutPolicy(bucket+":" + fileName);
            var token = putPolicy.token();
            var extra = new qiniu.io.PutExtra();
            qiniu.io.putFile(token, fileName, filePath, extra, function(err, ret) {
                if(!err) {
                    // 上传成功， 处理返回值
                    // ret.key 是图片的名字
                    var imageSrc = 'http://ovre0qmr5.bkt.clouddn.com/' + ret.key;
                    res.end(JSON.stringify({status:'100',msg:'上传成功',imageUrl:imageSrc}));
                } else {
                    // 上传失败， 处理返回代码
                    res.end(JSON.stringify({status:'101',msg:'上传失败',error:ret}));
                }
                // 上传之后删除本地文件
                fs.unlinkSync(filePath);
            });
        }
    });
});
router.post('/lookinfo', function(req, res, next) {
    if(req.body.id) {
      res.send({
          code:3009,
          message:"未输入id"
      })
        return;
    }
    mongoDB.CON(function (err,db) {
        DBMan.selectData(db,"users",function (collection) {
            var whereStr = {_id:req.body.id};
            collection.find(whereStr).toArray(function(err, result)
            {
                if(err)
                {
                    console.log('Error:'+
                        err);
                    return;
                }
                console.log(result);
                if (!result.length){
                    info={
                        code:3007,
                        message:"没有传入id"
                    }
                }
                else {
                    info.code=200;
                    info.message="登录成功";
                    info.data=result[0];

                }
                res.send(info);
            });
        })
    })

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
