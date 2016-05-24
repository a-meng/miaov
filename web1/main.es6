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
    data: {
        currentView: 'welcome'
    },
    events: {
        'welcomePageEnd': function () {
            console.info('welcomePageEnd')
            this.currentView = 'home';
        },
        'homePageEnd': function () {
            console.info('homePageEnd')
            this.currentView = 'news';
        }
    },

});