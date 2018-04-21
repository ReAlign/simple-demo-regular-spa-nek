import template from './index.html';

import BaseComponent from 'common/base/BaseComponent.js';
import Modal from './modal/index';

import * as API from './api';

const App = BaseComponent.extend({
    template,
    config(data) {
        this.supr(data);
    },

    async init() {
        this.getInfo();
        this.getInfo2();
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
    },

    async getInfo2() {
        try {
            const res = await API.getInfo2();
            this.cbGetInfo2(res || {});
        } catch(error) {
            console.log(error);
        }

        this.$update();
    },

    cbGetInfo2(res) {
        console.log(res);
    },

    showModal($event) {
        new Modal({
            data: {
                $event
            }
        });
    }
});

export default App;