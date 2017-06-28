(function () {
    let tree = [];//共享tree数据
    let VNode = {
        name: 'v-node',
        template: `<div :class="{'v-node':true,hasChildren:hasChildren,acitve:isActive}" >{{node.name}} </div>`,
        props: ['node'],
        computed: {
            hasChildren(){
                let children = this.node ? this.node.children : false;
                return children && children.length > 0;
            },
            isActive(){
                return this.node.active;
            }
        }
    };

    let VNodes = {
        components: {VNode},
        name: 'v-nodes',
        template: `<ul>
                        <li v-for="node in nodes">
                            <v-node :node="node"></v-node>
                            <template v-if="node.children">
                                <v-nodes :nodes="node.children"></v-nodes>
                            </template>
                        </li>
                    </ul>`,
        props: ['nodes'],
        computed: {
            hasChildren(){
                let children = this.item ? this.item.children : false;
                return children && children.length > 0;
            }
        },
    };

    Vue.component('v-tree', {
        components: {VNodes},
        props: ['tree', 'value'],
        template: `
            <div class="v-tree">
                <v-nodes :nodes="tree"></v-nodes>
            </div>
        `,
        methods: {},
        created(){
            tree = this.tree;
        }
    });

})();
