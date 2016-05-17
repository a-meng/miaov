var path=require('path');

module.exports = {
    entry: {
        huandengpian:"./huandengpian/main.es6",
        web1:"./web1/main.es6"
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