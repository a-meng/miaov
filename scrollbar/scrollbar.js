(function () {
    //浏览器默认scrollbar宽度
    const SCROLLBAR_WIDTH = getScrollbarWidth();
    //一些样式类名
    const CLASSNAMES = {
        element: 'gm-scrollbar-container',
        verticalScrollbar: 'gm-scrollbar -vertical',
        horizontalScrollbar: 'gm-scrollbar -horizontal',
        thumb: 'thumb',
        view: 'gm-scroll-view',
        autoshow: 'gm-autoshow',
        disable: 'gm-scrollbar-disable-selection',
        prevented: 'gm-prevented',
        resizeTrigger: 'gm-resize-trigger',
    };
    function isIE() {
        var agent = navigator.userAgent.toLowerCase();
        return agent.indexOf("msie") !== -1 || agent.indexOf("trident") !== -1 || agent.indexOf(" edge/") !== -1;
    }
    class Scrollbar {
        constructor(opt) {
            Object.assign(this, {
                element: null,
                autoshow: false,
                createElements: true,
                forceGemini: false,
                onResize: null,
                minThumbSize: 20
            }, opt);
        }

        create() {
            if (this._created === true) {
                console.warn('已经创建过');
                return this;
            }
            if (this.autoshow) {
                this.element.classList.add(CLASSNAMES.autoshow);
            }
            if (this.createElements === true) {
                //创建内容容器
                this._viewElement = document.createElement('div');
                //创建滚动条
                this._scrollbarVerticalElement = document.createElement('div');
                this._thumbVerticalElement = document.createElement('div');
                this._scrollbarHorizontalElement = document.createElement('div');
                this._thumbHorizontalElement = document.createElement('div');
                this._scrollbarVerticalElement.appendChild(this._thumbVerticalElement);
                this._scrollbarHorizontalElement.appendChild(this._thumbHorizontalElement);

                //把元素中的所有内容 装进创建的容器中
                while (this.element.childNodes.length > 0) {
                    this._viewElement.appendChild(this.element.childNodes[0]);
                }

                //把容器跟滚动条 放进绑定节点
                this.element.appendChild(this._scrollbarVerticalElement);
                this.element.appendChild(this._scrollbarHorizontalElement);
                this.element.appendChild(this._viewElement);

                //添加class name
                this.element.classList.add(CLASSNAMES.element);
                this._viewElement.classList.add(CLASSNAMES.view)
                this._scrollbarVerticalElement.classList.add(...CLASSNAMES.verticalScrollbar.split(/\s/));
                this._scrollbarHorizontalElement.classList.add(...CLASSNAMES.horizontalScrollbar.split(/\s/));
                this._thumbVerticalElement.classList.add(CLASSNAMES.thumb);
                this._thumbHorizontalElement.classList.add(CLASSNAMES.thumb);


                this._created = true;
                return this._bindEvents().update();
            }
        }

        _bindEvents() {
            return this;

        }

        update() {
            return this;
        }
    }

    function getScrollbarWidth() {
        var e = document.createElement('div'), sw;
        e.style.position = 'absolute';
        e.style.top = '-9999px';
        e.style.width = '100px';
        e.style.height = '100px';
        e.style.overflow = 'scroll';
        e.style.msOverflowStyle = 'scrollbar';
        document.body.appendChild(e);
        sw = (e.offsetWidth - e.clientWidth);
        document.body.removeChild(e);
        return sw;
    }

    window.Scrollbar = Scrollbar;
})();
