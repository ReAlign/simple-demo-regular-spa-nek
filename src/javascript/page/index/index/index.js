import './index.less';

import template from './index.html';

import BaseComponent from 'common/base/BaseComponent.js';

const App = BaseComponent.extend({
    template,
    config(data) {
        this.supr(data);
    }
});

export default App;