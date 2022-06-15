// 1.导入express模块
// const { application } = require('express');
const express = require('express');
const app = require('./app');
// 2.创建路由对象
const ruoter = express.Router();

const db = require('./mysql');

// 3.导入jsonwebtoken生成jwt字符串
const jwt = require('jsonwebtoken');
const expressJWT = require("express-jwt");
const secrctKey = 'itxiaoxi';
app.use(expressJWT({
    secret: secrctKey  // 签名的密钥 或 PublicKey
  }).unless({
    path: [/^\/api/]  // 指定路径不经过 Token 解析
  }))
//   app.use(
//     jwtt({
//         secret: secrctKey,
//         algorithms: ["HS256"],
//     }).unless({ path: ["/^\/api\//"] })
//   );
// 5.挂载路由
ruoter.post('/api/post',(req,res)=>{
    //5.1通过req.body属性获取客户端通过查询字符串，发送到服务器的数据
    const body = req.body;
    // 5.2SQL语句
    var sql = 'select * from userinfo where username=? and password=?';
    db.query(sql,[body.username,body.password],(err,results)=>{
        if (err) {
            return res.send({
                tastus:1,
                msg:'登录失败'
            });
        }
        //请求成功后生成jwt字符串
        //参数1，用户信息对象，2 secret密钥，3 token有效期
        const tokenStr = jwt.sign({username:body.username},secrctKey,{expiresIn:'90s'});
        res.send({
            tastus:0,
            msg:'登录成功',
            token:tokenStr
        });
    });
});
ruoter.get('/admin/get',(req,res)=>{
    res.send({
        status:0,
        msg:'成功',
        data:req.user
    });

});
// 6.把路由模块共享
module.exports=ruoter;