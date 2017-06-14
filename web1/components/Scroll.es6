Vue.component('com-scroll', {
    template: `
        <div class="scroll">
            <div :style="{width:len*100+'%',transform:translateX}" class="contain" >
                <slot></slot>
            </div>
            <div class="btns">
                <i v-for="btn in btns" :class="{selected:btn.selected}"></i>
            </div>
        </div>
    `,
    data(){
        return {
            currIndex: 0
        }
    },
    props: ['len'],
    computed: {
        btns: function () {
            var arr = [];
            for (var i = 0; i < this.len; i++) {
                arr.push({
                    index: i,
                    selected: i == this.currIndex
                });
            }
            return arr;
        },
        translateX: function () {
            var v=((this.currIndex)/this.len*100);
            return 'translateX(-'+v+'%)';
        }
    },
    ready(){
        var self=this;
        setInterval(function () {
            let next=self.currIndex+1;
            if(next==self.len){
                next=0;
            }
            self.currIndex=next;
        },3000);
    }
});