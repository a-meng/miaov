Vue.component('news', {
    template: `
    <div class="page" id="news">
        <div v-show="step1">
            <h1 style="text-align: center;">新闻线索</h1>
            <p>请上传旅游投诉以及突发事件线索</p>
            <div style="display: table;table-layout: fixed;width:100%;text-align: center;">
                <label style="display: table-cell">
                    <img src="img/camera1.png" />
                    <input type="file" style="display: none;"/>
                </label>
                <label style="display: table-cell">
                    <img src="img/camera2.png" />
                    <input type="file" style="display: none;"/>
                </label>
            </div>
        </div>
        <div v-show="step2">
            <com-panel title="给视频添加标签">
                <com-checkbox v-for="label in keywords" :label="label"></com-checkbox>
            </com-panel>
        </div>
    </div>
    `,
    data(){
        return {
            step1: true,
            step2: true,
            keywords: ['服务好', '好吃好玩', '没意思', '便宜实惠', '环境优美']
        }
    },


});