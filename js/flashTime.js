// time
function flashTime() {
    var time = new Date();
    // console.log(time);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var day = time.getDate();
    var week = time.getDay();
    // console.log(day);
    document.getElementById("time-year").innerHTML = year;
    document.getElementById("time-month").innerHTML = month;
    document.getElementById("time-day").innerHTML = day;
    var weekday;
    if (week == 0) {
        weekday = "天";
    } else if (week == 1) {
        weekday = "一"
    } else if (week == 2) {
        weekday = "二"
    } else if (week == 3) {
        weekday = "三"
    } else if (week == 4) {
        weekday = "四"
    } else if (week == 5) {
        weekday = "五"
    } else if (week == 6) {
        weekday = "六"
    }
    document.getElementById("week").innerHTML = "星期" + weekday;
    var hour = time.getHours();
    var minute = time.getMinutes();
    var second = time.getSeconds();
    if (hour < 10) {
        hour = '0' + hour;
    }
    if (minute < 10) {
        minute = '0' + minute;
    }
    if (second < 10) {
        second = '0' + second;
    }
    document.getElementById("time-hour").innerHTML = hour;
    document.getElementById("time-minute").innerHTML = minute;
    document.getElementById("time-second").innerHTML = second;
}

// flashTime();

window.setInterval("flashTime()", 1000);