import template from './index.html';

import BaseComponent from 'common/base/BaseComponent.js';
import Modal from './modal/index';

const App = BaseComponent.extend({
    template,
    config(data) {
        this.supr(data);
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