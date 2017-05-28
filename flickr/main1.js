(function () {

    class ImgList {
        constructor(target) {
            this.$target = $(target);
        }

        fetch(url) {
            $.getJSON(url, (data) => {
                let html = this.getHtml(data);
                this.render(html);
            });
        }

        getHtml(data) {
            let html = '<ul class="imgList">';
            data.forEach(e => {
                html += `<li><img src="${e.media.src}" alt=""></li>`;
            })
            html += '</ul>';
            return html;
        }

        render(html) {
            this.$target.html(html)
        }
    }

    window.imgList = target => new ImgList(target);
})();