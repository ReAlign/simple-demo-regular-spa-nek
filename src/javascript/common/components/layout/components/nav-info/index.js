/**
 * @name   导航头部
 * @author hzanliangjun(hzanliangjun@corp.netease.com)
 * @since  2018-03-14
 */
import './index.less';

import BaseComponent from 'common/base/BaseComponent';

import template from './index.html';

const App = BaseComponent.extend({
    template,
    config(data) {
        this.supr(data);
    }
});

export default App;