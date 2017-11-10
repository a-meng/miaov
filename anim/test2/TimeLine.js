class TimeLine {
    constructor(resolveHandler, interval) {
        this.nextTick = 0;                      //下一步执行时间
        this.interval = interval;               //动画间隔
        this.resolveHandler = resolveHandler;   //每一步的动画回调数组
        this.__frameHandler = null;             //存储定时器指针
        this.step = 0;                          //已经工作的步数
    }

    start(step) { //可以设置从第几步开始，否则一直往后面加 这样可以timeLine.start(0)来表示从头开始
        //防止被反复调用
        if (this.nextTick === 0) {
            if (step) this.step = step;
            this.nextTick = Date.now();
            this.__fire();
        }
    }

    stop() {
        window.cancelAnimationFrame(this.__frameHandler);
        this.nextTick = 0; //归零表示已经停止npm
    }

    __fire() {
        let now = Date.now();
        let step = this.step;
        if (this.nextTick <= now) {
            if (typeof this.resolveHandler === 'function') {
                this.resolveHandler(step);
            } else if (Array.isArray(this.resolveHandler)) {
                this.resolveHandler.forEach(fn => fn.call(this, step));  //挨个调用回调
            }

            this.step = step + 1;
            this.nextTick = now + this.interval;//不堆积,只往当前时间后面走
        }
        this.__frameHandler = window.requestAnimationFrame(() => this.__fire());
    }

    //一个自动改变图片背景 的 resolveHandler 工具方法
    static changePosition(node, positions) {
        return function (step) {
            console.info(step,positions.length,step % positions.length)
            let p = positions[step % positions.length].split(' ');
            node.style.backgroundPosition = `-${p[0]}px -${p[1]}px`;
        }
    }
}
