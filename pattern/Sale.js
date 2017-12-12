/*
 * 装饰器模式更简单的写法
 * 特点：在运行时添加附加功能
 * */
class Sale {
    constructor(price) {
        this.price = price;
    }

    getPrice() {
        return this.price;
    }

//没调用一次装饰器 就是 造一个新对象，对象的 uber属性指向之前对象，这样 实现层层调用 最后调用回最终接口
    decorate(name) {
        //选择的装饰器
        var decor = this.constructor.decorators[name];
        var newObj = Object.create(this.constructor.prototype);//返回一个新Sale实例
        return Object.assign(newObj, decor, {uber: this}); //这个新实例方法被装饰器方法重写，uber提供原实例的引用
    }
}

//放装饰器的地方
Sale.decorators = {};

//加两个个装饰器
Sale.decorators.offPrice = {
    getPrice(){
        return this.uber.getPrice() / 2;
    }
};

Sale.decorators.money = {
    getPrice(){
        return this.uber.getPrice().toFixed(2);
    }
};

var sale = new Sale(100)
    .decorate('offPrice')
    .decorate('money');
console.info(sale.getPrice());
