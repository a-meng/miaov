var path=require('path');

module.exports = {
    entry: {
        huandengpian:"./huandengpian/main.es6", //幻灯片练习
        web1:"./web1/main.es6", //移动页面练习1
        shop:'./shop/main.es6' //移动页面购物网站练习
    },
    output: {
        path: path.join(__dirname, "js"),
        filename: "[name].main.js"
    },
    module: {
        loaders: [
            { test: /\.es6$/, loader: "babel" }
        ]
    }
};