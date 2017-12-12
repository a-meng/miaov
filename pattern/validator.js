/*
 * 策略模式
 * 特点：在运行时选择算法
 * */
var validator = {
    //支持的校验类型
    types: {},
    //错误消息
    messages: [],
    //校验配置
    config: {},
    //校验方法
    validate(data){
        let messages = [];
        for (let key in data) {
            let value = data[key];
            let checkMethod = this.config[key];
            if (checkMethod) {
                if (this.types[checkMethod].valid(value) === false) {
                    messages.push({
                        field: key,
                        message: this.types[checkMethod].message
                    });
                }
            }
        }
        this.messages = messages;

    }
};
//添加校验函数
validator.types.required = {
    valid(str){
        console.info('valid',str);
        var text = str.toString();
        return text.length > 0;
    },
    message: '不能为空'
};
validator.types.number = {
    valid(str){
        console.info('valid',str);
        var text = str.toString();
        return /^[0-9]+$/.test(str)
    },
    message: '必须是数字'
};
//使用
validator.config = {
    name: 'required',
    age: 'number'
};
validator.validate({
    name: '',
    age: 'a',
});

console.info(validator.messages);