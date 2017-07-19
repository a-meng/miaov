//快捷操作（只插入和读取JSON）
const lStore = {
    get: (key) => JSON.parse(localStorage.getItem(key) || '""'),
    set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    remove: (key) => localStorage.removeItem(key)
};

//购物车store
const cartStore = new Vuex.Store({
    state: {
        //商品列表 {id,name,price,num}
        goods: lStore.get('cart') || []
    },
    getters: {
        totalPrice({goods}){
            let price = 0;
            goods.forEach(e => {
                price += e.price*e.num||0;
            });
            return price.toFixed(2);
        }
    },
    mutations: {
        'cart/del'({goods}, id){
            let index = goods.findIndex(e => e.id === id);
            if (index > -1) goods.splice(index, 1);
        },
        'cart/add'({goods}, item){
            let has = goods.find(e => e.id === item.id);
            if (has) {
                has.num++;
            } else {
                goods.push({...item,num:1});
            }
        },
        'cart/edi'({goods}, item){
            let has = goods.find(e => e.id === item.id);
            console.info(has.num,item.num);
            if (has) {
                has.num = item.num;
                console.info(has.num)
            }

        }
    },
    actions: {
        addGoods({state, commit}, item){
            commit('cart/add', item);
            lStore.set('cart', state.goods);
        },
        ediGoods({state, commit}, item){
            commit('cart/edi', item);
            lStore.set('cart', state.goods);
        },
        delGoods({state, commit}, id){
            commit('cart/del', id);
            lStore.set('cart', state.goods);
        },
        changeNum({state, commit}, item){
            commit('cart/edit', item);
            lStore.set('cart', state.goods);
        }
    }
});