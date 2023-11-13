// webSocket 
const socket = new WebSocket("ws://localhost:8080");
socket.addEventListener("open", function() {
    console.log("连接成功");
});
socket.addEventListener("message", function(e) {
    console.log("客户端接收到的消息" + e.data);
    if (e.data == "login_second") {
        var login = document.getElementById("login");
        var changeInfo = document.getElementById("changeInfo");
        alert("登陆成功！");
        var main = document.getElementById("main");
        main.style.opacity = 0;
        login.style.zIndex = 0;
        login.style.display = "none";
        changeInfo.style.zIndex = 999;
        // changeInfo.style.opacity = 1;
        changeInfo.style.display = "block";
        var editBtn1 = document.getElementById("editBtn1");
        // var editBtn2 = document.getElementById("editBtn2");
        // var editBtn3 = document.getElementById("editBtn3");
        // var editBtn4 = document.getElementById("editBtn4");
        editBtn1.style.display = "block";
        // editBtn2.style.display = "block";
        // editBtn3.style.display = "block";
        // editBtn4.style.display = "block";

    } else if (e.data == "查询出错" || e.data == "用户不存在" || e.data == "密码错误") {
        alert(e.data);
    } else if (e.data.includes("visit")) {
        console.log("visit");
        var times = e.data.split("&");
        document.getElementById("visit").innerHTML = times[1];
    } else if (e.data.includes("update")) {
        var updateMsg = e.data.split("&");
        document.getElementById("personnameInfo").innerHTML = updateMsg[1];
        document.getElementById("sexInfo").innerHTML = updateMsg[2];
        document.getElementById("birthInfo").innerHTML = updateMsg[3];
        document.getElementById("phoneNumberInfo").innerHTML = updateMsg[4];
        document.getElementById("emailInfo").innerHTML = updateMsg[5];
        document.getElementById("placeInfo").innerHTML = updateMsg[6];

        document.getElementById("nameChange").value = updateMsg[1];
        document.getElementById("sexChange").value = updateMsg[2];
        document.getElementById("birthChange").value = updateMsg[3];
        document.getElementById("phoneNumberChange").value = updateMsg[4];
        document.getElementById("emailChange").value = updateMsg[5];
        document.getElementById("placeChange").value = updateMsg[6];
    } else if (e.data.includes("photo")) {
        var photoURL = e.data.split("&")[1];
        document.getElementById("profile-pic").src = "./img/upload/" + photoURL;
        document.getElementById("photo").style.backgroundImage = 'url("./img/upload/' + photoURL + '")';
    } else if (e.data.includes("editText1")) {
        console.log("接收到修改教育背景信息");
        var editMsg = e.data.split("&")[1];
        document.getElementById("jybj").innerHTML = editMsg;
        //替换所有的换行符
        editMsg = editMsg.replace(/\r\n/g, "<br>") //兼容i7、i8
        editMsg = editMsg.replace(/\n/g, "<br>"); //i9及以上
        //替换所有的空格（中文空格、英文空格都会被替换）
        editMsg = editMsg.replace(/\s/g, "&nbsp;");
        document.getElementById("th1").innerHTML = editMsg;
    }
});