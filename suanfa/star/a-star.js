/**
 * 关键点：
 * 位置对象 {x:Number,y:Number,from:上一个点的引用} 
 */

export class AStar {
    constructor(size = 20) {
        this.size=size;
        this.map = createMap(size);
    }

    createMap(size) {
        this.size=size;
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
    get wall(){
        return this.map.filter(e=>e.type==='wall');
    }

    set startPoint(point) {
        this.where({ type: 'start' }, e => type = '');
        this.where(point, e => type = 'start');
    }
    get startPoint(){
        return this.find(e=>e.type==='start');
    }
    set endPoint(point) {
        this.where({ type: 'end' }, e => type = '');
        this.where(point, e => type = 'end');
    }
    //寻路
    get way() {
        let closePoints = [...this.wall], openPoints = [this.startPoint];
        function go() {
            //从开放点中取出一个
            let currPoint=openPoints.shift();
            //放入闭合点中
            closePoints.push(currPoint);
            //计算开放点周围的点

        }
    }
    get map() {
        return this.map;
    }

    where(point, callback) {
        let item = this.map.find(e => {
            return ['x', 'y', 'type'].every(k => {
                return point[k] && point[k] != e[k] ? false : true;
            })
        });
        if (item) callback(item);
    }

    //估价函数
    f(point){
        
    }

}