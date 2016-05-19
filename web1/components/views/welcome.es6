Vue.component('welcome', {
    template: `
    <div class="page" id="welcome">
        <img v-if="tree" class="tree animated fadeInUp" @animationend="treeShowEnd" src="img/tree.jpg"/>
        <img v-if="shakeimg" src="img/shake.png"/>
        <img v-if="title"  class="title animated fadeInUp" @animationend="titleShowEnd" src="img/title.png"/>
        <img v-if="title2" class="title2 animated fadeInUp" @animationend="title2ShowEnd" src="img/title2.png"/>
    </div>
    `,
    data(){
        return {
            tree: true,
            shakeimg: false,
            title: false,
            title2: false
        }
    },
    methods: {
        treeShowEnd(){
            this.title = true;
        },
        titleShowEnd(){
            this.title2 = true;
        },
        title2ShowEnd(){
            //图片都显示后1.5秒后跳转
            setTimeout(()=>this.$dispatch('welcomeOpenEnd'), 1500);
        }
    },
    ready: function () {
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