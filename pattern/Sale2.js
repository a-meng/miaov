/*
 * 装饰器模式更简单的写法
 * 特点：在运行时添加附加功能
 * */

class Sale {
    constructor(price) {
        this.price = price;
        this.decorator_list = [];//用于保存装饰器集合
    }

    decorate(name) {
        this.decorator_list.push(this.constructor.decorators[name]);
        return this;//返回this支持链式调用
    }

    //一些操作
    getPrice() {
        let price = this.price;
        return this.decorator_list.reduce((a, b) => {
            return b.getPrice ? b.getPrice(a) : a;
        }, price);
    }

}

Sale.decorators = {};

//提供一些装饰器
Sale.decorators.offPrice = {
    getPrice(price){
        return price / 2;
    }
}

Sale.decorators.money = {
    getPrice(price){
        return price.toFixed(2);
    }
};

var sale = new Sale(100)
    .decorate('offPrice')
    .decorate('money');
console.info(sale.getPrice());