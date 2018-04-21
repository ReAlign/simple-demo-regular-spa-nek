import _ from 'widget/util.js';

import template from './index.html';

import BaseComponent from 'common/base/BaseComponent.js';

const App = BaseComponent.extend({
    template,
    config(data) {
        _.extend(data, {
            value: 'value'
        });

        this.supr(data);
    }
});

export default App;