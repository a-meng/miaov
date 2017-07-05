(function () {
    let VNode = {
        name: 'v-node',
        template: `<div  :class="{'v-node':true,hasChildren:hasChildren,active:active}" >
                    <input ref="input" v-if="isEdit" v-model="node.name" type="text"
                        @blur="isEdit=false"
                    >
                    <span :data-nid="node.id" @dblclick ="openEditor" v-else>{{node.name}}</span>
                    </div>`,
        props: ['node', 'active'],
        data(){
            return {
                isEdit: false
            }
        },
        computed: {
            hasChildren(){
                let children = this.node ? this.node.children : false;
                return children && children.length > 0;
            },
        },
        methods: {
            openEditor(event){
                this.isEdit = true;
                setTimeout(() => this.$refs.input.focus(), 0)

            }
        }

    };

    let VNodes = {
        components: {VNode},
        name: 'v-nodes',
        template: `<ul>
                        <li v-for="node in nodes">
                            <v-node :node="node" :active="node.id==active"></v-node>
                            <template v-if="node.children">
                                <v-nodes :nodes="node.children" :active="active"></v-nodes>
                            </template>
                        </li>
                    </ul>`,
        props: ['nodes', 'active'],
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
        data(){
            return {
                controlShow: false,
                nodeId: null,
                position: {}
            }
        },
        template: `
            <div class="v-tree" @click="chooseNodeHandler" @contextmenu.prevent="controlHandler">
                <v-nodes :nodes="tree" :active="value"></v-nodes>
                <div class="v-tree-control" v-show="controlShow" :style="position">
                    <button @click="addItemHandler">添加新项</button>
                    <button @click="addChildHandler">添加子项</button>
                    <button @click="delItemHandler">删除当前</button>
                    <button @click="delChildrenHandler">删除子项</button>
                </div>
            </div>
        `,
        methods: {
            //选中
            chooseNodeHandler(event){
                let nodeId = event.target.dataset.nid;
                if (nodeId) {
                    this.$emit('input', nodeId);
                }
            },
            //右键单击
            controlHandler(event){
                let nodeId = event.target.dataset.nid;
                if (nodeId) {
                    this.nodeId = nodeId;
                    this.position = {
                        left: event.layerX + 'px',
                        top: event.layerY + 'px',
                    };
                    this.controlShow = true;
                }
            },
            addChildHandler(){
                let {nodeId, tree} = this;
                let node = findNodeById(nodeId, tree);
                if (node) {
                    if (node.children === undefined) node.children = []
                    node.children.append({name: '', content: '', children: []})
                }
            },
            addItemHandler(){
                let {nodeId, tree} = this;
                let children = findParentById(nodeId, tree);
                if (children) {
                    let index = children.findIndex(e => e.id === nodeId);
                    children.splice(index+1, 0, {name: '', content: '', children: []});
                }
            },
            delItemHandler(){

            },
            delChildrenHandler(){

            }
        },
        created(){

        }
    });

    function findNodeById(id, tree) {
        for (let i in tree) {
            let item = tree[i];
            if (item.id === id)return item;
            let res = findNodeById(id, item.children || []);
            if (res) return res;
        }
    }

    function findParentById(id, tree) {
        for (let i in tree) {
            let item = tree[i];
            if (item.id === id)return tree;
            let res = findParentById(id, item.children || []);
            if (res) return res;
        }
    }
})();
