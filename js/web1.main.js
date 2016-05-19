/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	__webpack_require__(2);

	__webpack_require__(3);

	__webpack_require__(4);

	__webpack_require__(5);

	__webpack_require__(6);

	__webpack_require__(7);

	//应用入口
	var app = new Vue({
	    el: '#app',
	    data: {
	        currentView: 'welcome'
	    },
	    events: {
	        'welcomeOpenEnd': function welcomeOpenEnd() {
	            this.currentView = 'home';
	        },
	        'homeSubmitEnd': function homeSubmitEnd() {
	            this.currentView = 'news';
	        }
	    }

	}); //引入组件

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Vue.component('home', {
	    template: '\n     <div class="page show" id="home">\n        <div class="header">\n            <div class="light">\n                新闻线索\n            </div>\n            <com-scroll len="4">\n                <div class="item">\n                    <img style="width:100%;height:150px;" class="block" src="img/1.jpg">\n                </div>\n                <div class="item">\n                    <img style="width:100%;height:150px;" class="block" src="img/2.jpg">\n                </div>\n                <div class="item">\n                    <img style="width:100%;height:150px;" class="block" src="img/3.jpg">\n                </div>\n                <div class="item">\n                    <img style="width:100%;height:150px;" class="block" src="img/4.jpg">\n                </div>\n            </com-scroll>\n        </div>\n\n        <com-panel title="给景区评分">\n            <com-star-list :list=\'starList\'></com-star-list>\n        </com-panel>\n\n        <com-panel title="给景区添加标签">\n            <com-checkbox v-for="label in keywords" :label="label"></com-checkbox>\n        </com-panel>\n\n        <footer>\n            <button class="big" @click="submitHandler" type="button">提交</button>\n        </footer>\n\n        <div transition="fade" v-show="submitOverlay" class="submit-overlay">\n            <h1>提交成功</h1>\n        </div>\n    </div>\n    ',
	    data: function data() {
	        return {
	            submitOverlay: false,
	            keywords: ['服务好', '好吃好玩', '没意思', '便宜实惠', '环境优美'],
	            starList: [{
	                text: '综合印象',
	                value: 5
	            }, {
	                text: '服务指数',
	                value: 2
	            }, {
	                text: '消费指数',
	                value: 0
	            }]
	        };
	    },

	    methods: {
	        submitHandler: function submitHandler() {
	            var _this = this;

	            this.submitOverlay = true;
	            setTimeout(function () {
	                return _this.$dispatch('homeSubmitEnd');
	            }, 2000);
	        }
	    }
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Vue.component('welcome', {
	    template: '\n    <div class="page" id="welcome">\n        <img v-if="tree" class="tree animated fadeInUp" @animationend="treeShowEnd" src="img/tree.jpg"/>\n        <img v-if="shakeimg" src="img/shake.png"/>\n        <img v-if="title"  class="title animated fadeInUp" @animationend="titleShowEnd" src="img/title.png"/>\n        <img v-if="title2" class="title2 animated fadeInUp" @animationend="title2ShowEnd" src="img/title2.png"/>\n    </div>\n    ',
	    data: function data() {
	        return {
	            tree: true,
	            shakeimg: false,
	            title: false,
	            title2: false
	        };
	    },

	    methods: {
	        treeShowEnd: function treeShowEnd() {
	            this.title = true;
	        },
	        titleShowEnd: function titleShowEnd() {
	            this.title2 = true;
	        },
	        title2ShowEnd: function title2ShowEnd() {
	            var _this = this;

	            //图片都显示后1.5秒后跳转
	            setTimeout(function () {
	                return _this.$dispatch('welcomeOpenEnd');
	            }, 1500);
	        }
	    },
	    ready: function ready() {
	        /*var $tree=$(this.$els.tree);
	         var $title=$(this.$els.title);
	         var $title2=$(this.$els.title2);
	         var $shakeimg=$(this.$els.shakeimg);
	         $tree.animateCss('animated fadeInUp', function () {
	         $title.animateCss('animated fadeInUp', function () {
	         $title2.animateCss('animated fadeInUp', function () {
	           });
	         });
	         });*/
	    }
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Vue.component('news', {
	    template: '\n    <div class="page" id="news">\n        <div v-show="step1">\n            <h1 style="text-align: center;">新闻线索</h1>\n            <p>请上传旅游投诉以及突发事件线索</p>\n            <div style="display: table;table-layout: fixed;width:100%;text-align: center;">\n                <label style="display: table-cell">\n                    <img src="img/camera1.png" />\n                    <input type="file" style="display: none;"/>\n                </label>\n                <label style="display: table-cell">\n                    <img src="img/camera2.png" />\n                    <input type="file" style="display: none;"/>\n                </label>\n            </div>\n        </div>\n        <div v-show="step2">\n            <com-panel title="给视频添加标签">\n                <com-checkbox v-for="label in keywords" :label="label"></com-checkbox>\n            </com-panel>\n        </div>\n    </div>\n    ',
	    data: function data() {
	        return {
	            step1: true,
	            step2: true,
	            keywords: ['服务好', '好吃好玩', '没意思', '便宜实惠', '环境优美']
	        };
	    }
	});

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Vue.component('com-checkbox', {
	    template: '\n        <label class="checkbox">\n            <input :checked="checked" type="checkbox"  />\n            <span>{{label}}</span>\n        </label>\n    ',
	    props: ['checked', 'label']
	});

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Vue.component('com-scroll', {
	    template: '\n        <div class="scroll">\n            <div :style="{width:len*100+\'%\',transform:translateX}" class="contain" >\n                <slot></slot>\n            </div>\n            <div class="btns">\n                <i v-for="btn in btns" :class="{selected:btn.selected}"></i>\n            </div>\n        </div>\n    ',
	    data: function data() {
	        return {
	            currIndex: 0
	        };
	    },

	    props: ['len'],
	    computed: {
	        btns: function btns() {
	            var arr = [];
	            for (var i = 0; i < this.len; i++) {
	                arr.push({
	                    index: i,
	                    selected: i == this.currIndex
	                });
	            }
	            return arr;
	        },
	        translateX: function translateX() {
	            var v = this.currIndex / this.len * 100;
	            return 'translateX(-' + v + '%)';
	        }
	    },
	    ready: function ready() {
	        var self = this;
	        setInterval(function () {
	            var next = self.currIndex + 1;
	            if (next == self.len) {
	                next = 0;
	            }
	            self.currIndex = next;
	        }, 3000);
	    }
	});

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Vue.component('com-star-list', {
	    template: '\n    <ul class="star-list">\n        <li v-for="item in list">\n            <strong>{{item.text}}</strong>\n            <div class="star">\n                <i @click="item.value=1"\n                    :class="{selected:item.value>=1}"\n                ></i>\n                <i @click="item.value=2"\n                    :class="{selected:item.value>=2}"\n                ></i>\n                <i @click="item.value=3"\n                    :class="{selected:item.value>=3}"\n                ></i>\n                <i @click="item.value=4"\n                    :class="{selected:item.value>=4}"\n                ></i>\n                <i @click="item.value=5"\n                    :class="{selected:item.value>=5}"\n                ></i>\n            </div>\n        </li>\n    </ul>\n    ',
	    props: ['list'],
	    methods: {
	        choose: function choose(index, value) {
	            console.info(this.list, index);
	            this.list[index].value = value;
	        }
	    },
	    ready: function ready() {}
	});

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Vue.component('com-panel', {
	    template: '\n    <div class="panel">\n        <div class="title">{{title}}</div>\n        <div class="content"><slot></slot></div>\n    </div>\n    ',
	    props: ['title']
	});

/***/ }
/******/ ]);