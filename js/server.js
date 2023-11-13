var userName;
var pictureName;

var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "user"
});

connection.connect((error) => {
    if (error) {
        console.log("连接失败" + error);
    } else {
        console.log("连接数据库成功");
    }
});

var isRight = false;

function judge(userId, Password, connect) {
    connection.query("select * from personal where ID=?", userId, (err, result) => {
        if (err) {
            console.log("查询出错" + err);
            isRight = false;
            connect.send("查询出错");
        } else {
            console.log(result);
            if (result.length == 0) {
                console.log("用户不存在");
                isRight = false;
                connect.send("用户不存在");
            } else {
                if (result[0].Password != Password) {
                    console.log("密码错误");
                    isRight = false;
                    connect.send("密码错误");
                } else {
                    console.log("登录成功");
                    isRight = true;
                    connect.send("login_second");
                    connection.query("update personal set times=times+1 where id=?", userId, (err, result) => {
                        console.log("访问次数加一");
                    });
                    connection.query("select times from personal where id='admin'", (err, result) => {
                        console.log(result[0].times);
                        connect.send("visit&" + result[0].times);
                    });
                    connection.query("select * from personal where id=?", userId, (err, result) => {
                        var sendMsg = "update&" + result[0].Name + "&" + result[0].Sex + "&" + result[0].Birth + "&" + result[0].Phone + "&" + result[0].Email + "&" + result[0].Address;
                        connect.send(sendMsg);
                        pictureName = result[0].Photo;
                        var photoURL = "photo&" + result[0].Photo;
                        connect.send(photoURL);
                        var editjybjText = "editText1&" + result[0].JYBJ;
                        connect.send(editjybjText);
                    });
                }
            }
        }
    });
}

function closeConnection() {
    connection.end();
}

const ws = require('../node_modules/nodejs-websocket');
const express = require('express');
const multiparty = require("multiparty");
const fs = require('fs');
const { log } = require("console");
const PORT = 8080;

// 每次有用户连接上来都会给用户创建一个connect对象
const server = ws.createServer(connect => {
    console.log("有用户连接上来了");
    // 每当用户传递数据，text事件就会被触发
    connect.on("text", data => {
        var msg = data.split("&");
        console.log("接收到用户数据：" + msg[0]);
        userName = msg[1];
        if (msg[0] == "login_second") {
            judge(msg[1], msg[2], connect);
        } else if (msg[0] == "login_first") {
            connection.query("update personal set times=times+1 where id='admin'", (err, result) => {
                console.log("访问次数加一");
            });
            connection.query("select times from personal where id='admin'", (err, result) => {
                console.log(result[0].times);
                connect.send("visit&" + result[0].times);
            });
            connection.query("select * from personal where id='admin'", (err, result) => {
                var sendMsg = "update&" + result[0].Name + "&" + result[0].Sex + "&" + result[0].Birth + "&" + result[0].Phone + "&" + result[0].Email + "&" + result[0].Address;
                connect.send(sendMsg);
                pictureName = result[0].Photo;
                var photoURL = "photo&" + result[0].Photo;
                connect.send(photoURL);
                var editjybjText = "editText1&" + result[0].JYBJ;
                connect.send(editjybjText);
            });
        } else if (msg[0] == "confirmChange") {
            console.log(msg);
            var sqldata = [];
            // sqldata[0] = pictureName;
            sqldata[1] = msg[1];
            // connection.query("update personal set photo=? where id=?", sqldata, (err, result) => {
            //     console.log(pictureName);
            //     console.log("修改头像");
            // });
            sqldata[0] = msg[3];
            connection.query("update personal set name=? where id=?", sqldata, (err, result) => {
                console.log("修改姓名");
            });
            sqldata[0] = msg[4];
            connection.query("update personal set sex=? where id=?", sqldata, (err, result) => {
                console.log("修改性别");
            });
            sqldata[0] = msg[5];
            connection.query("update personal set birth=? where id=?", sqldata, (err, result) => {
                console.log("修改出生日期");
            });
            sqldata[0] = msg[6];
            connection.query("update personal set phone=? where id=?", sqldata, (err, result) => {
                console.log("修改手机号码");
            });
            sqldata[0] = msg[7];
            connection.query("update personal set email=? where id=?", sqldata, (err, result) => {
                console.log("修改邮箱");
            });
            sqldata[0] = msg[8];
            connection.query("update personal set address=? where id=?", sqldata, (err, result) => {
                console.log("修改地址");
            });
            connection.query("select * from personal where id=?", msg[1], (err, result) => {
                var sendMsg = "update&" + result[0].Name + "&" + result[0].Sex + "&" + result[0].Birth + "&" + result[0].Phone + "&" + result[0].Email + "&" + result[0].Address;
                connect.send(sendMsg);
                connect.send("photo&" + pictureName);
            });
        } else if (msg[0] == "editText1") {
            var jybjText = [];
            jybjText[0] = msg[2];
            jybjText[1] = msg[1];
            console.log(jybjText);
            connection.query("update personal set jybj=? where id=?", jybjText, (err, result) => {
                console.log("修改教育背景");
            });
            connection.query("select * from personal where id=?", msg[1], (err, result) => {
                console.log(result[0]);
                var sendMsg = "editText1&" + result[0].JYBJ;
                connect.send(sendMsg);
            });
        }
    });
    connect.on("close", () => {
        console.log("连接断开");
    });
    connect.on("error", () => {
        console.log("用户连接异常");
    });
})

server.listen(PORT, () => {
    console.log('websocket服务启动成功了,监听了端口' + PORT);
})

// 换头像


const app = express();
app.post('/upload', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let form = new multiparty.Form({ uploadDir: './img/upload' });
    form.parse(req, (err, fields, files) => {
        console.log('fields', fields);
        console.log('files', files);
        pictureName = files.file[0].path.split("\\")[2];
        console.log(pictureName);
        var m = [pictureName, userName];
        connection.query("update personal set photo=? where id=?", m, (err, result) => {
            console.log("修改头像");
        });
        res.send(pictureName);
    });
});

app.listen(8000, () => {
    console.log("服务器已上线");
});