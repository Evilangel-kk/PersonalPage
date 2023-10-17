window.onload = function() {
    flashTime();
    let ch1 = document.getElementById("ch1");
    let ch2 = document.getElementById("ch2");
    let ch3 = document.getElementById("ch3");
    let ch4 = document.getElementById("ch4");

    let text1 = document.getElementById("text1");
    let text2 = document.getElementById("text2");
    let text3 = document.getElementById("text3");
    let text4 = document.getElementById("text4");

    let person = document.getElementById("photo");
    let massage = document.getElementById("information");
    let social = document.getElementById("social");
    let dital = document.getElementById("dital");
    let info = document.getElementById("info");
    let backToHome = document.getElementById("backToHome");
    let home = document.getElementById("home");
    let edit = document.getElementById("write");
    let cancellogin = document.getElementById("cancel");


    person.style.top = "30%";
    massage.style.top = "-18%";
    dital.style.width = 0;
    let massage_open = false;
    let dital_open = false;

    person.onclick = function() {
        if (massage_open) {
            this.style.top = "30%";
            massage.style.top = "-18%";
            massage.style.opacity = 0;
            social.style.opacity = 0;
            massage_open = false;
            backToHome.style.zIndex = 1;
            edit.style.opacity = 0;
        } else {
            this.style.top = "10%";
            massage.style.top = "0";
            massage.style.opacity = 1;
            social.style.opacity = 1;
            edit.style.opacity = 1;
            massage_open = true;
        }
        if (!dital_open) {
            dital.style.width = "80%";
            dital.style.opacity = 1;
            info.style.background = "radial-gradient(transparent, rgba(242, 127, 127, 0.5))";
            info.style.boxShadow = "10px 10px 10px rgba(0, 0, 0, 0.3)";
            dital_open = true;
            backToHome.style.opacity = 1;
            edit.style.opacity = 1;
            backToHome.style.zIndex = 10;
            home.style.opacity = 0;
        }
    }

    backToHome.onclick = function() {
        if (dital_open) {
            this.style.zIndex = 1;
            dital.style.width = "0";
            dital.style.opacity = 0;
            info.style.background = "none";
            info.style.boxShadow = "none";
            dital_open = false;
            backToHome.style.opacity = 0;
            person.style.top = "30%";
            massage.style.top = "-18%";
            massage.style.opacity = 0;
            social.style.opacity = 0;
            edit.style.opacity = 0;
            massage_open = false;
            home.style.opacity = 1;
        }
    }

    ch1.onclick = function() {
        text1.style.visibility = "visible";
        text2.style.visibility = "hidden";
        text3.style.visibility = "hidden";
        text4.style.visibility = "hidden";
        ch1.style.backgroundColor = "rgba(255, 55, 55, 0.4)";
        ch2.style.backgroundColor = "rgba(125, 3, 15, 0.5)";
        ch3.style.backgroundColor = "rgba(125, 3, 15, 0.5)";
        ch4.style.backgroundColor = "rgba(125, 3, 15, 0.5)";
    }
    ch1.onclick();
    ch1.onmouseover = function() {
        if (this.style.backgroundColor == "rgba(125, 3, 15, 0.5)")
            this.style.backgroundColor = "rgb(195, 47, 61)";
    }
    ch1.onmouseout = function() {
        if (this.style.backgroundColor == "rgb(195, 47, 61)")
            this.style.backgroundColor = "rgba(125, 3, 15, 0.5)";
    }

    ch2.onclick = function() {
        text1.style.visibility = "hidden";
        text2.style.visibility = "visible";
        text3.style.visibility = "hidden";
        text4.style.visibility = "hidden";
        ch1.style.backgroundColor = "rgba(125, 3, 15, 0.5)";
        ch2.style.backgroundColor = "rgba(255, 55, 55, 0.4)";
        ch3.style.backgroundColor = "rgba(125, 3, 15, 0.5)";
        ch4.style.backgroundColor = "rgba(125, 3, 15, 0.5)";
    }
    ch2.onmouseover = function() {

        if (this.style.backgroundColor == "rgba(125, 3, 15, 0.5)")
            this.style.backgroundColor = "rgb(195, 47, 61)";
    }
    ch2.onmouseout = function() {
        if (this.style.backgroundColor == "rgb(195, 47, 61)")
            this.style.backgroundColor = "rgba(125, 3, 15, 0.5)";
    }

    ch3.onclick = function() {
        text1.style.visibility = "hidden";
        text2.style.visibility = "hidden";
        text3.style.visibility = "visible";
        text4.style.visibility = "hidden";
        ch1.style.backgroundColor = "rgba(125, 3, 15, 0.5)";
        ch2.style.backgroundColor = "rgba(125, 3, 15, 0.5)";
        ch3.style.backgroundColor = "rgba(255, 55, 55, 0.4)";
        ch4.style.backgroundColor = "rgba(125, 3, 15, 0.5)";
    }
    ch3.onmouseover = function() {
        if (this.style.backgroundColor == "rgba(125, 3, 15, 0.5)")
            this.style.backgroundColor = "rgb(195, 47, 61)";
    }
    ch3.onmouseout = function() {
        if (this.style.backgroundColor == "rgb(195, 47, 61)")
            this.style.backgroundColor = "rgba(125, 3, 15, 0.5)";
    }

    ch4.onclick = function() {
        text1.style.visibility = "hidden";
        text2.style.visibility = "hidden";
        text3.style.visibility = "hidden";
        text4.style.visibility = "visible";
        ch1.style.backgroundColor = "rgba(125, 3, 15, 0.5)";
        ch2.style.backgroundColor = "rgba(125, 3, 15, 0.5)";
        ch3.style.backgroundColor = "rgba(125, 3, 15, 0.5)";
        ch4.style.backgroundColor = "rgba(255, 55, 55, 0.4)";
    }
    ch4.onmouseover = function() {
        if (this.style.backgroundColor == "rgba(125, 3, 15, 0.5)")
            this.style.backgroundColor = "rgb(195, 47, 61)";
    }
    ch4.onmouseout = function() {
        if (this.style.backgroundColor == "rgb(195, 47, 61)")
            this.style.backgroundColor = "rgba(125, 3, 15, 0.5)";
    }


    // 打字机效果
    const textEl = document.querySelector("#text");
    const texts = JSON.parse(textEl.getAttribute("data-text"));

    let index = 0;
    let charIndex = 0;
    let delta = 400;
    let start = null;
    let isDeleting = false;

    function type(time) {
        window.requestAnimationFrame(type);
        if (!start) start = time;
        let progress = time - start;
        if (progress > delta) {
            let text = texts[index];
            if (!isDeleting) {
                textEl.innerHTML = text.slice(0, ++charIndex);
                delta = 300 - Math.random() * 200;
            } else {
                textEl.innerHTML = text.slice(0, charIndex--);
            }
            start = time;

            if (charIndex == text.length) {
                isDeleting = true;
                delta = 100;
                start = time + 1200;
            }

            if (charIndex < 0) {
                isDeleting = false;
                start = time + 200;
                index = ++index % texts.length;
            }
        }
    }

    window.requestAnimationFrame(type);
    // 进行编辑
    let editRight = false;
    let loginPage = document.getElementById("login");
    edit.onclick = () => {
        if (!editRight) {
            alert("请登陆后进行编辑操作");
            // loginPage.style.opacity = 1;
            loginPage.style.display = "block";
            loginPage.style.zIndex = 999;
            editRight = true;
        } else {
            // changeInfo.style.opacity = 1;
            changeInfo.style.display = "block";
            changeInfo.style.zIndex = 1;
            main.style.opacity = 0;
            main.style.zIndex = 0;
        }
    };
    // 取消登录
    cancellogin.onclick = () => {
        // loginPage.style.opacity = 0;
        loginPage.style.display = "none";
        loginPage.style.zIndex = 0;
        alert("取消登录，无法编辑信息");
    };
    // 提交账号密码
    var login = document.getElementById("submit");
    var u;
    var p;
    login.onclick = function() {
        u = document.getElementById("userID").value;
        p = document.getElementById("Password").value;
        var msg = "login_second&" + u + "&" + p;
        socket.send(msg);
    }
    socket.send("login_first&admin&admin");

    // 修改信息
    var changeInfo = document.getElementById("changeInfo");

    // var photoChange = document.getElementById("photoChange");
    var photoChange = document.getElementById("profile-pic");
    var nameChange = document.getElementById("nameChange");
    var sexChange = document.getElementById("sexChange");
    var birthChange = document.getElementById("birthChange");
    var phoneNumberChange = document.getElementById("phoneNumberChange");
    var emailChange = document.getElementById("emailChange");
    var placeChange = document.getElementById("placeChange");

    var photo = document.getElementById("photo");
    var personnameInfo = document.getElementById("personnameInfo");
    var sexInfo = document.getElementById("sexInfo");
    var birthInfo = document.getElementById("birthInfo");
    var phoneNumberInfo = document.getElementById("phoneNumberInfo");
    var emailInfo = document.getElementById("emailInfo");
    var placeInfo = document.getElementById("placeInfo");


    var confirmChange = document.getElementById("confirmChange");
    var main = document.getElementById("main");



    // 取消修改
    var cancelChange = document.getElementById("cancelChange");
    cancelChange.onclick = () => {
        changeInfo.style.display = "none";
        changeInfo.style.zIndex = 0;
        main.style.opacity = 1;
        main.style.zIndex = 1;
        alert("取消修改信息");
    };
    // 确认修改
    confirmChange.onclick = () => {
        if (sexChange.value.length != 1 || phoneNumberChange.value.length != 11 || nameChange.value.includes("&") || sexChange.value.includes("&") || birthChange.value.includes("&") || phoneNumberChange.value.includes("&") || emailChange.value.includes("&") || placeChange.value.includes("&")) {
            alert("信息格式有误");
        } else {
            var msg = "confirmChange&" + u + "&" + p + "&" + nameChange.value + "&" + sexChange.value + "&" + birthChange.value + "&" + phoneNumberChange.value + "&" + emailChange.value + "&" + placeChange.value;
            socket.send(msg);
            if (isChangePhoto) {
                let formData = new FormData(form);
                formData.append('file', form.children[0].files[0]);
                const xhr = new XMLHttpRequest();
                xhr.open('POST', 'http://localhost:8000/upload', true);
                xhr.onreadystatechange = function() {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        console.log("res:" + xhr.responseText)
                    }
                }
                xhr.send(formData);
            }

            alert("修改成功");
            changeInfo.style.zIndex = 0;
            changeInfo.style.display = "none";
            main.style.opacity = 1;
            main.style.zIndex = 1;
        }
    }

    // 修改头像
    let profilePic = document.getElementById("profile-pic");
    let inputFile = document.getElementById("input-file");
    var isChangePhoto = false;
    inputFile.onchange = (event) => {
        isChangePhoto = true;
        profilePic.src = URL.createObjectURL(inputFile.files[0]);
    };

    let form = document.getElementById("uploadPicture");
}