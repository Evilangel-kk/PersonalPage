//weather
function getWeather(place) {
    AMap.plugin('AMap.Weather', function() {

        //创建天气查询实例
        var weather = new AMap.Weather();

        //执行实时天气信息查询
        weather.getLive(place, function(err, data) {
            console.log(data);
            document.getElementById("temperature").innerHTML = data.temperature;
            document.getElementById("power").innerHTML = "风力：" + data.windPower;
            document.getElementById("direction").innerHTML = "风向：" + data.windDirection;
            document.getElementById("hanzi").innerHTML = data.weather;
            document.getElementById("city").innerHTML = data.province + " / " + data.city;
            document.getElementById("sun").style.visibility = "hidden";
            document.getElementById("cloud").style.visibility = "hidden";
            document.getElementById("clouds").style.visibility = "hidden";
            document.getElementById("rain").style.visibility = "hidden"
            document.getElementById("cloud").style.visibility = "hidden"
            document.getElementById("sun-cloud").style.visibility = "hidden";
            document.getElementById("wind").style.visibility = "hidden";
            document.getElementById("night").style.visibility = "hidden";
            if (data.weather == "晴间多云")
                document.getElementById("sun-cloud").style.visibility = "visible";
            else if (data.weather == "晴")
                if (new Date().getHours <= 19) {

                    document.getElementById("sun").style.visibility = "visible";
                } else {
                    document.getElementById("night").style.visibility = "visible";
                }

            else if (data.weather == "多云" || data.weather.includes("阴"))
                document.getElementById("clouds").style.visibility = "visible";
            else if (data.weather == "少云")
                document.getElementById("cloud").style.visibility = "visible";
            else if (data.weather.search("雨"))
                document.getElementById("rain").style.visibility = "visible"
            else if (data.weather.search("雪"))
                document.getElementById("cloud").style.visibility = "visible"
            else if (data.weather.search("风"))
                document.getElementById("wind").style.visibility = "visible";
        });
    });
}
var mycity = "长沙市";
getWeather(mycity);
window.setInterval(getWeather(mycity), 1800000);