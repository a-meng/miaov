(function () {
    /* 技巧：： 把操作参数放前面 数据放后面,用flow拼出处理数据处理流程 */
    //curry化的map和console.info
    var map = _.curry((callback, list) => list.map(callback));
    var info = _.curry((prefix,e) => {
        console.info(prefix,e);
        return e;
    });
    //不纯的方法
    var impure = {
        getJSON: _.curry((callback, url) => $.getJSON(url, callback)),
        setHtml: _.curry((target, html) => $(target).html(html))
    };

    window.imgList = function (target) {
        let main = _.flow([
            //解析数据
            map(_.property('media.src')),
            info('src属性'),
            //拼img标签
            map(e => `<img src="${e}"/>`),
            info('img标签'),
            //拼完整html
            e => `<ul class="imgList">${e.map(e => `<li>${e}</li>`).join('')}</ul>`,
            info('完整html'),
            //渲染dom
            impure.setHtml(target)
        ]);


        return {
            fetch: impure.getJSON(main)
        }
    }
})();