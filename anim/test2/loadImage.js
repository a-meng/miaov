function loadImage(srcList) {
    return srcList.map(function (src) {
        return new Promise(function (resolve, reject) {
            let img = new Image();

            img.onload = function () {
                resolve(src);
            };
            img.onerror = reject;
            img.src = src;
        });
    })
}