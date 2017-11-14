//一个可以反复开关和暂停的帧动画定时器封装
class TimeLine {
    constructor({interval = 60, frameCallback = emptyFun()}) {
        //定时器开始,下一帧执行时间,持续时间
        this.start_time = 0;
        this.next_time = 0;
        this.duration = 0;
        //频率和定时器回调 在timeLine实例上直接覆盖方式使用
        this.interval = interval;
        this.frameCallback = frameCallback;
        //定时器指针 用于关闭循环
        this.requestID = 0;
    }

    start() {
        //next_time=0表示动画是停止状态
        if (this.next_time === 0) {
            let now = Date.now();
            this.start_time = now - this.duration;
            this.next_time = now;
            this.__fireFrame();
        }
        return this;
    }

    setOpt({interval, frameCallback}) {
        if (interval) this.interval = interval;
        if (frameCallback) this.frameCallback = frameCallback;
        return this
    }

    pause() {
        this.__stopFrame();
        //更新持续时间 用来重新start时 续接动作
        this.duration = Date.now() - this.start_time;
        return this;
    }

    stop() {
        this.__stopFrame();
        this.duration = 0;
        return this;
    }

    __stopFrame() {
        window.cancelAnimationFrame(this.requestID);
        this.next_time = 0;
    }

    __fireFrame() {
        let now = Date.now();
        this.requestID = window.requestAnimationFrame(this.__fireFrame.bind(this));
        //任务在计时器后面调用 这样 就可以在计时器回调里面停止下一次的任务
        if (this.next_time <= now) {
            //回调中 使用start_time 不传步数，可以保证多个动画之间的同步执行
            this.frameCallback(this.start_time);
            //不堆积,只往当前时间后面走
            this.next_time = now + this.interval;
        }
    }
}

function emptyFun() {
    return function () {
    }
}