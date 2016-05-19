Vue.component('com-checkbox', {
    template: `
        <label class="checkbox">
            <input :checked="checked" type="checkbox"  />
            <span>{{label}}</span>
        </label>
    `,
    props: ['checked', 'label']
});