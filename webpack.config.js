module.exports = {
    entry: "./huandengpian/main.es6",
    output: {
        path: './huandengpian/',
        filename: "main.js"
    },
    module: {
        loaders: [
            { test: /\.es6$/, loader: "babel" }
        ]
    }
};