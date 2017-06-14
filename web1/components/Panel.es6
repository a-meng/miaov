Vue.component('com-panel', {
    template: `
    <div class="panel">
        <div class="title">{{title}}</div>
        <div class="content"><slot></slot></div>
    </div>
    `,
    props: ['title']
});