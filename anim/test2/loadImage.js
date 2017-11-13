//加载图片
function loadImage(src) {
    return new Promise(function (resolve, reject) {
        let img = new Image();
        img.onload = resolve;

        img.onerror = reject;
        img.src = src;
    });
}

