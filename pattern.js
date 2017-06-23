/*
 * 工厂模式
 * 特点：功能相同 构造器不同 (不同构造器创建有相同接口的对象)
 * */

//汽车制造器
function CarMaker() {

}
//汽车都有驾驶的功能
CarMaker.prototype.drive = function () {
    console.info(this.name + '的实例调用了drive')
};

//工厂方法 会调用构造器，并配上原型
CarMaker.factory = function (type) {
    var constr = CarMaker[type];

    if (typeof constr !== 'function') {
        throw {name: "Error", message: `CarMaker.${type} is not a function`};
    }
    if (constr.prototype.constructor !== CarMaker) {
        console.info('继承原型');
        constr.prototype = new CarMaker();
    }
    return new constr;
};

//实现一辆SUV的构造器
CarMaker.SUV = function () {
    this.name = 'SUV';
};


/*
 * 装饰器模式
 * 特点：叠加操作的方式扩展接口
 * */
class Sale {
    constructor(price) {
        this.price = price;
    }

    getPrice() {
        return this.price;
    }

    //
    decorate(name) {
        var uber=this.constructor.decorators[name];
        return {
            uber,

        }
    }
}

//放装饰器的地方
Sale.decorators = {};

//加两个个装饰器
Sale.decorators.offPrice = {
    getPrice(num){
        return this.uber.getPrice() * num;
    }
}

Sale.decorators.money = {
    getPrice(){
        return this.uber.getPrice().toFixed(2);
    }
};

var sale = new Sale(100)
    .decorate('offPrice')
    .decorate('money')
    .getPrice();
