// // 1.导入express模块
// const express = require('express');
// // 2.创建服务器对象
// const app = express();
const app = require('./app');
var expressJWT= require("express-jwt");
// 3.创建获取表单数据的中间件
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

// 4.导入cors中间件解决接口跨域问题
const cors = require('cors');
app.use(cors());

//导入路由模块
const ruoter = require('./route');
app.use(ruoter);

app.use((err, req, res, next) => {
    // 验证失败导致的错误
    if (err.name='UnauthorizedError') return res.send({
    status:401,
    msg:'无效的token'
});
//     // 未知的错误
    res.send({
    status:500,
    msg:'未知的错误'
});
  })
// 5.启动服务器
app.listen(80,()=>{
    console.log('http://127.0.0.1');
});
