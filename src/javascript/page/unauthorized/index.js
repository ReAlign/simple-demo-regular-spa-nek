import './index.less';

import template from './index.html';

import BaseComponent from 'common/base/BaseComponent';

export default BaseComponent.extend({
    template,
    init() {
        this.supr();
    }
});