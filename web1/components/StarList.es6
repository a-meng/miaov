Vue.component('com-star-list', {
    template: `
    <ul class="star-list">
        <li v-for="item in list">
            <strong>{{item.text}}</strong>
            <div class="star">
                <i @click="item.value=1"
                    :class="{selected:item.value>=1}"
                ></i>
                <i @click="item.value=2"
                    :class="{selected:item.value>=2}"
                ></i>
                <i @click="item.value=3"
                    :class="{selected:item.value>=3}"
                ></i>
                <i @click="item.value=4"
                    :class="{selected:item.value>=4}"
                ></i>
                <i @click="item.value=5"
                    :class="{selected:item.value>=5}"
                ></i>
            </div>
        </li>
    </ul>
    `,
    props: ['list'],
    methods:{
        choose(index,value){
            console.info(this.list,index);
            this.list[index].value=value;
        }
    },
    ready(){

    }
});