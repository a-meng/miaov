Vue.component('home', {
    template: `
     <div class="page show" id="home">
        <div class="header">
            <com-scroll len="4">
                <div class="item">
                    <img style="width:100%;height:150px;" class="block" src="img/1.jpg">
                </div>
                <div class="item">
                    <img style="width:100%;height:150px;" class="block" src="img/2.jpg">
                </div>
                <div class="item">
                    <img style="width:100%;height:150px;" class="block" src="img/3.jpg">
                </div>
                <div class="item">
                    <img style="width:100%;height:150px;" class="block" src="img/4.jpg">
                </div>
            </com-scroll>
            <div class="light">新闻<br/>线索</div>
        </div>

        <com-panel title="给景区评分2">
            <com-star-list :list='starList'></com-star-list>
        </com-panel>

        <com-panel title="给景区添加标签">
            <com-checkbox v-for="label in keywords" :label="label"></com-checkbox>
        </com-panel>

        <footer>
            <button class="big" @click="submitHandler" type="button">提交</button>
        </footer>

        <div transition="fade" v-show="submitOverlay" class="submit-overlay">
            <h1>提交成功</h1>
        </div>
    </div>
    `,
    data(){
        return {
            submitOverlay: false,
            keywords: ['服务好', '好吃好玩', '没意思', '便宜实惠', '环境优美'],
            starList:[{
                text:'综合印象',
                value:5
            },{
                text:'服务指数',
                value:2
            },{
                text:'消费指数',
                value:0
            }]
        }
    },
    methods: {
        submitHandler(){
            this.submitOverlay = true;
            setTimeout(()=>this.$dispatch('homeSubmitEnd'), 2000);
        }
    }
});