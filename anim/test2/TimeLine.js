//其实就是一个可以反复开关和暂停的定时器封装

class TimeLine {
    constructor(intervalFunc, interval) {
        //下一步执行时间 0表示停止状态
        this.nextTick = 0;
        //动画间隔
        this.interval = interval || 60;
        //每一步的动画回调数组
        this.func = intervalFunc || emptyFun();
        //存储定时器指针
        this.__frameHandler = null;
        //定时器开始时间
        this.start_time = 0;
        //定时器已经运行时间
        this.dur = 0;
    }

    start() {
        //防止被反复调用
        if (this.nextTick === 0) {
            this.start_time = Date.now() - this.dur;
            this.nextTick = Date.now();
            this.__FireFrame();
        }
        return this;
    }

    pause() {
        this.__stopFrame();
        this.dur = Date.now() - this.start_time;
        return this;
    }

    stop() {
        this.__stopFrame();
        this.dur = 0;
        return this;
    }

    intervalFunc(fn) {
        this.func = fn;
        return this;
    }

    intervalNum(val) {
        this.interval = val;
        return this;
    }

    __stopFrame() {
        window.cancelAnimationFrame(this.__frameHandler);
        this.nextTick = 0;
    }

    __FireFrame() {
        let now = Date.now();
        this.__frameHandler = window.requestAnimationFrame(() => this.__FireFrame());
        //任务在计时器后面调用 这样 就可以在计时器回调里面停止任务
        if (this.nextTick <= now) {
            //回调中 使用start_time 不传步数，可以保证多个动画之间的同步执行
            this.func(this.start_time);
            //不堆积,只往当前时间后面走
            this.nextTick = now + this.interval;
        }
    }
}

function emptyFun() {
    return function () {
    }
}