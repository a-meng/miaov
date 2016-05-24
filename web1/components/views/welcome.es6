Vue.component('welcome', {
    template: `
    <div class="page" id="welcome">
    <style>
        #welcome img {
            display: block;
            opacity: 0;
            margin:2rem auto;
            max-width: 100%;
        }
        #welcome .tree{
            -webkit-animation: fadeInUp 1s  ease-out forwards;
            animation: fadeInUp 1s  ease-out forwards;
        }
        #welcome .title{
            -webkit-animation: fadeInUp 1s 1s ease-out forwards;
            animation: fadeInUp 1s 1s ease-out forwards;
        }
        #welcome .title2{
            -webkit-animation: fadeInUp 1s 2s ease-out forwards;
            animation: fadeInUp 1s 2s ease-out forwards;
        }
    </style>
        <img  class="tree" src="img/tree.jpg"/>
        <img  class="title" src="img/title.png"/>
        <img  class="title2" src="img/title2.png"/>
    </div>
    `,
    ready: function () {
        setTimeout(()=>this.$dispatch('welcomePageEnd'), 4800);
    }
});