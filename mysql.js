// 3.导入mysql模块
const mysql = require('mysql');
// 4.连接数据库
const db = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'admin123',
    database:'my_db_01'
});
// 判断数据库是否连接成功
// db.query('select 1',(err,results)=>{
//     if(err) return console.log(err.message);
//     console.log(results);
// });

module.exports = db;