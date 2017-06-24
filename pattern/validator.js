/*
 * 策略模式
 * 特点：在运行时选择算法
 * */
var validator = {
    //支持的校验类型
    types: [],
    //错误消息
    messages: [],
    //校验配置
    config: {},
    //校验方法
    validate(data){

    }
};

//使用
validator
    .config = {
    name: ['require'],
    age: ['isAge'],
    phone: ['require', 'isPhone']
}
    .validate({
        name: '',
        age: 0,
        phone: ''
    });
console.info(validator.messages)