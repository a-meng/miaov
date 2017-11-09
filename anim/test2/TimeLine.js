class TimeLine {
    constructor(resolveHandler, interval) {
        this.nextTick = 0;
        this.interval = interval;
        this.resolveHandler = resolveHandler;
        this.__frameHandler = null;
    }

    start() {
        if (this.nextTick === 0) {
            this.nextTick = Date.now();
            this.__fire();
        }
    }

    stop() {
        window.cancelAnimationFrame(this.__frameHandler);
        this.nextTick = 0;
    }

    __fire() {
        let now = Date.now();
        if (this.nextTick <= now) {
            this.resolveHandler(this.nextTick);
            this.nextTick = now + this.interval;//不堆积,只往当前时间后面走
        }
        this.__frameHandler = window.requestAnimationFrame(() => this.__fire());
    }

}