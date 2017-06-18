class AStar {
    constructor(size) {
        this.map = []
        _.times(size, y => {
            _.times(size, x => {
                this.map.push({ x: x, y: y });
            });
        });
    }
    //设置元素
    fromPoint(from) {
        this.from = this.map.find(e => e.x === from.x && e.y === from.y);
    }
    toPoint(to) {
        this.to = this.map.find(e => e.x === to.x && e.y === to.y);
    }
    wallPoints(wall) {
        this.wall = this.map.filter(e => {
            return wall.find(ee => ee.x === e.x && ee.y === e.y) !== undefined;
        });
    }

    way() {
        let { map, from, to, wall, f } = this;
        //closeArr:墙和走过的点(因为不排除走过的点的话 就会反复在一个点上一直循环) openArr:所有可到达的点(所有有来源的点 可以回溯)
        let closeArr = [...wall], openArr = [from];
        //寻路
        go();
        //筛出一条路径(所有点在加入open都会有from属性记录上一个点，最终会回到起点)
        let path = [];
        let p = closeArr.pop();
        while (p !== from) {
            path.push(p);
            p = p.from;
        }
        return path;

        function go() {
            let curr = openArr.shift();
            if (curr === to) return; //如果碰到终点 就停止继续找

            //向openArr中离两点之间最近的点走
            closeArr.push(curr);
            //找下一步没加入过openArr的可到达点
            let round = roundPoints(curr, map)
                .filter(e => _.concat(openArr, closeArr).indexOf(e) === -1);
            //记录下来这些点可以从当前点过来，并加入openArr
            round.forEach(e => {
                e.f = f(from, e, to);
                e.from = curr;
                openArr.push(e);
            });
            //把最优点放到前面第一个
            openArr.sort((a, b) => a.f - b.f);
            //继续往下走
            go();
        }
        function roundPoints({ x, y }, map) {
            let points = [x - 1, x, x + 1].map(xx => {
                return [y - 1, y, y + 1].map(yy => {
                    return map.find(e => e.x === xx && e.y === yy);
                });
            });
            return _.concat(...points).filter(e => e !== undefined);
        }

    }
    //估价函数 就是 这个点离两个点之间的距离和
    f(from, curr, to) {
        let xx = from.x - curr.x, yy = from.y - curr.y;
        let xx2 = curr.x - to.x, yy2 = curr.y - to.y;
        return Math.sqrt(xx * xx + yy * yy) + Math.sqrt(xx2 * xx2 + yy2 * yy2)
    }
}