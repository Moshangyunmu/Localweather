
window.onload = function () {

    function ajaxFun(obj) {

        //1.创建请求对象
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

        //2.判断请求方法
        var method = obj.method.toUpperCase();

        if (method == "GET") {
            xhr.open(method, obj.url + "?" + obj.data, true);
            xhr.send(null);
        } else if (method == "POST") {
            xhr.open(method, obj.url, true);
            xhr.send(obj.data);
        } else {
            console.error("请求方式有误，请选择get/post中的一种");
        }

        //3.监听服务器返回事件
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    obj.successFun(xhr.responseText);
                } else {
                    obj.failFun("请求数据失败");
                    console.warn(xhr.status);
                }
            }
        };
    }

    var oTemp = document.getElementById("temp");
    var oImg = oTemp.getElementsByTagName("img")[0];
    var oOther = document.getElementById("other");
    var aLi = oOther.getElementsByTagName("li");
    var oP = document.getElementsByTagName("p")[0];

    var obj = {
        method: "Get",
        url: "http://wthrcdn.etouch.cn/weather_mini?city=西安",
        data: "",
        successFun: successFun,
        failFun: failFun
    };

    ajaxFun(obj);

    function  getImg(weather) {
        oImg.src = "img/"+weather+".gif";
    }

    function successFun(data) {
        var resultObj = JSON.parse(data).data;
        var forecastArray = resultObj.forecast;

         /*for (var i in forecastArray){
         var array = forecastArray[i];
         div.innerHTML += array.date + "<br>" + array.type + "<br>" +array.high + "<br>" + array.low+"<br>"+array.fengli+ "<br>" + array.fengxiang;
         }*/
        getImg(resultObj.forecast[0].type);
        oTemp.innerHTML += resultObj.wendu + '<strong>C</strong>';
        aLi[1].innerHTML = resultObj.forecast[0].type;
        aLi[2].innerHTML = resultObj.forecast[0].fengxiang + ':' + resultObj.forecast[0].fengli;
        oP.innerHTML = "提示：" + resultObj.ganmao;

    }

    function failFun(data) {
        alert(data);
    }
};

/*
var forecastArray = resultObj.forecast;

 for (var i in forecastArray){
 var array = forecastArray[i];
 div.innerHTML += array.date + "<br>" + array.type + "<br>" +array.high + "<br>" + array.low+"<br>"+array.fengli+ "<br>" + array.fengxiang;
 */