/*
 * 工厂模式
 * 特点：用于创建具有相同接口的对象
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
        // console.info('继承原型');
        constr.prototype = new CarMaker();
    }
    return new constr;
};

//实现一辆SUV的构造器
CarMaker.SUV = function () {
    this.name = 'SUV';
};


var suv1 = CarMaker.factory('SUV');
var suv2 = CarMaker.factory('SUV');

suv2.drive();