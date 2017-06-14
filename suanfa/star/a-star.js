/**
 * 关键点：
 * 位置对象 {x:Number,y:Number,from:上一个点的引用} 
 */
(function () {
    class AStar {
        constructor(size = 20) {
            this.size = size;
            this.map = [];
            for (let x = 0; x < size; x++) {
                for (let y = 0; y < size; y++) {
                    this.map.push({ x, y, form: null });
                }
            }
        }
        set wall(points) {
            this.map.forEach(e => {
                if (e.type === 'wall') this.type = '';
            })
            points.forEach(e => this.where(e, p => p.type = 'wall'));
        }
        get wall() {
            return this.map.filter(e => e.type === 'wall');
        }

        set startPoint(point) {
            this.where({ type: 'start' }, e => type = '');
            this.where(point, e => type = 'start');
        }
        get startPoint() {
            return this.find(e => e.type === 'start');
        }
        set endPoint(point) {
            this.where({ type: 'end' }, e => type = '');
            this.where(point, e => type = 'end');
        }
        //寻路
        get way() {
            let { endPoint, startPoint, wall, f } = this;
            let closePoints = [...wall], openPoints = [startPoint];

            function go() {
                //从开放点中取出一个
                let currPoint = openPoints.shift();
                if (currPoint === endPoint) return back(closePoints);
                //放入闭合点中
                closePoints.push(currPoint);
                //取当前点周围的点
                this.findRound(currPoint)
                    //过滤已经有的和不能用的
                    .filter(e => [...closePoints, ...openPoints].indexOf(e) === -1)
                    //给点加 估价和 关系属性form 并且放入open集合中
                    .forEach(p => {
                        p.from = currPoint;
                        p.f = f(p);
                        openPoints.push(p);
                    });
                //排序open
                openPoints.sort((a, b) => a.f - b.f);
                //递归
                go()
            }
            function back(closePoints) {
                //从闭合数组中取出路径
                let path = [];
                let point = closePoints.pop();
                while (point != this.startPoint) {
                    path.push(point);
                    let point = closePoints.find(e => e === point.from);
                }
                return path;
            }
        }

        where(point, callback) {
            let item = this.map.find(e => {
                return ['x', 'y', 'type'].every(k => {
                    return point[k] && point[k] != e[k] ? false : true;
                })
            });
            if (item) callback(item);
        }
        findRound(point) {
            let { x, y } = point;
            let points = [];
            this.map.forEach(e => {
                [x - 1, x, x + 1].forEach(xx => {
                    [y - 1, y, y + 1].forEach(yy => {
                        if (e.x == xx && e.y == yy && e !== point) points.push(e);
                    })
                })
            });
            return points;
        }
        //估价函数
        f(point) {
            let { startPoint, endPoint } = this;
            let xx = startPoint.x - endPoint.x, yy = startPoint.y - endPoint.y;
            return Math.sqrt(xx * xx + yy * yy)
        }

    }

    window.AStar = AStar;
})()


