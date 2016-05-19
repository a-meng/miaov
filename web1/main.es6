//引入组件
import  './components/views/Home.es6';
import  './components/views/Welcome.es6';
import  './components/views/News.es6';

import  './components/Checkbox.es6';
import  './components/Scroll.es6';
import  './components/StarList.es6';
import  './components/Panel.es6';

//应用入口
var app = new Vue({
    el: '#app',
    data:{
        currentView:'welcome'
    },
    events:{
        'welcomeOpenEnd': function () {
            this.currentView='home';
        },
        'homeSubmitEnd': function () {
            this.currentView='news';
        }
    },

});