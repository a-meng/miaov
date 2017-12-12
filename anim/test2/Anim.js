//多个动作组合动画

class Anim {
    constructor() {
        this.task_list = [];
        this.task_step = 0;
        this.timeLine = new TimeLine({
            interval: 10,
            frameCallback: start_time => {
                this.task_list[this.task_step].call(this, start_time)
            }
        });
    }

    addTask(task) {
        this.task_list.push(task);
        return this;
    }

    start() {
        this.timeLine.start();
        return this;
    }

    pause() {
        this.timeLine.pause();
        return this;
    }

    stop() {
        this.task_step = 0;
        this.timeLine.stop();
        return this;
    }

    repeat() {
        return this;
    }

    next(_step) {
        let step = Number.isInteger(_step) ? _step : this.task_step + 1;
        if (!this.task_list[step]) {
            this.stop();
        } else {
            this.task_step = step;
        }
        return this;
    }

    //一些快捷方法
    delay(time) {
        return this.addTask(function (start_time) {
            this.pause();
            setTimeout(() => {
                console.info('重启', this);
                this.start()
            }, time);
        })
    }
}
