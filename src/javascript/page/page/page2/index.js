import _ from 'widget/util.js';

import template from './index.html';

import BaseComponent from 'common/base/BaseComponent.js';

import * as API from './api';

const App = BaseComponent.extend({
    template,
    config(data) {
        _.extend(data, {
            value: 'value'
        });

        this.supr(data);
    },

    async init() {
        this.getInfo();
    },

    async getInfo() {
        try {
            const res = await API.getInfo();
            this.cbGetInfo(res || {});
        } catch(error) {
            console.log(error);
        }

        this.$update();
    },

    cbGetInfo(res) {
        console.log(res);
    }
});

export default App;