var express = require('express');
var router = express.Router();
var mongoDB=require("./MGDB");
var DBMan=require("./DBManager");
/* GET users listing. */
// mongoDB.CON(function (err,db) {
//     DBMan.insertData(db,function () {
//         var collection = db.collection('goods');
//         //插入数据
//         var data = [{
//             goodname:"冰皮月饼礼盒装女朋友巧克力浪漫惊喜送礼",
//             price:"39.00",
//             url:"http://ovre0qmr5.bkt.clouddn.com/1.jpg_220x220.jpg",
//         },{
//             goodname:"稻香村双黄莲蓉月饼中秋散装蛋黄多口味月饼",
//             price:"12.00",
//             url:"http://ovre0qmr5.bkt.clouddn.com/2.jpg",
//         },{
//             goodname:"正在秒杀 月饼中秋节月饼礼盒团购盒装",
//             price:"19.90",
//             url:"http://ovre0qmr5.bkt.clouddn.com/3.jpg_220x220.jpg",
//         },{
//             goodname:"中秋送礼必备 roco gift月饼礼盒装",
//             price:"158.00",
//             url:"http://ovre0qmr5.bkt.clouddn.com/4.jpg_220x220.jpg",
//
//         },{
//             goodname:"锦华815尊贵装1350g月饼礼盒中秋月饼送礼",
//             price:"558.00",
//             url:"http://ovre0qmr5.bkt.clouddn.com/5r.jpg_220x220.jpg",
//
//         },{
//             goodname:"中秋节竹篮月饼礼盒装蛋黄莲蓉双层",
//             price:"39.80",
//             url:"http://ovre0qmr5.bkt.clouddn.com/6.jpg_220x220.jpg",
//
//         },{
//                 goodname:"限时抢购中秋月饼礼盒装桃山皮月饼礼盒",
//                 price:"39.90",
//                 url:"http://ovre0qmr5.bkt.clouddn.com/7.jpg_220x220.jpg",
//
//             },{
//             goodname:"三珍斋中秋月饼礼盒送礼广式多口味团购盒装",
//             price:"39.90",
//             url:"http://ovre0qmr5.bkt.clouddn.com/8.jpg_220x220.jpg",
//
//              },{
//             goodname:"味王蛋黄莲蓉月饼中秋纯白豆沙散装礼盒",
//             price:"20.90",
//             url:"http://ovre0qmr5.bkt.clouddn.com/9.jpg_220x220.jpg_.webp.jpg",
//
//             },{
//             goodname:"黄家月2斤大月饼 五仁金腿叉烧肉丝公馆黄记",
//             price:"109.00",
//             url:"http://ovre0qmr5.bkt.clouddn.com/10.jpg_220x220.jpg_.webp.jpg",
//
//         },{
//             goodname:"台湾进口礼坊永恒之恋高档双层中秋月饼礼盒",
//             price:"109.90",
//             url:"http://ovre0qmr5.bkt.clouddn.com/11.jpg_220x220.jpg_.webp.jpg",
//
//         },{
//             goodname:"广式月饼礼盒送礼560g多口味团购福利包邮",
//             price:"29.90",
//             url:"http://ovre0qmr5.bkt.clouddn.com/12.jpg_220x220.jpg_.webp.jpg",
//
//         },{
//             goodname:"莫斯科餐厅月饼礼盒悦色甜点 中秋送礼",
//             price:"76.00",
//             url:"http://ovre0qmr5.bkt.clouddn.com/13.jpg_220x220.jpg_.webp.jpg",
//
//         },{
//             goodname:"月饼形星空巧克力礼盒280g送礼中秋礼物团购",
//             price:"69.00",
//             url:" http://ovre0qmr5.bkt.clouddn.com/14.jpg_220x220.jpg_.webp.jpg",
//
//         },{
//             goodname:"金碧辉煌1220 g奶油椰蓉口味中秋节",
//             price:"328.00",
//             url:"http://ovre0qmr5.bkt.clouddn.com/15.jpg_220x220.jpg_.webp.jpg",
//
//         },{
//             goodname:"秒杀五仁大月饼广式中秋五仁月饼团购包邮",
//             price:"118.00",
//             url:" http://ovre0qmr5.bkt.clouddn.com/16.png_220x220.jpg_.webp.jpg",
//
//         }];
//
//         collection.insert(data, function(err, result) {
//
//             if (err) {
//                 console.log('Error:' + err);
//
//                 return;
//             }
//             console.log(result);
//         });
//     })
// });
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/goodlist', function(req, res, next) {
    var info={};
    mongoDB.CON(function (err,db) {
        DBMan.selectData(db,"goods",function (collection) {

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
                            info.message="获取全部商品成功";
                            info.data=result;
                    res.send(info);
                });
            })
        })


});
module.exports=router;