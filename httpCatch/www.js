var express = require('express');
var app = express();


//首页
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
//js文件
app.get('/jquery2.1.js', function (req, res) {
    res.sendFile(__dirname + '/jquery2.1.js');
});
app.get('/search', function (req, res) {
    res.set('Cache-Control', 'only-if-cached');
    //做一个延迟
    setTimeout(function () {
        console.info('执行请求操作')
        res.send('请求时间是：' + Date.now());
    }, 2000);

});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});