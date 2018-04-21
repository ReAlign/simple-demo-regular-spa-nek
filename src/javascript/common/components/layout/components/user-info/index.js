/**
 * @name   用户信息
 * @author hzanliangjun(hzanliangjun@corp.netease.com)
 * @since  2018-03-14
 */
import './index.less';

import _u from 'widget/util.js';

import BaseComponent from 'common/base/BaseComponent';

import template from './index.html';

const App = BaseComponent.extend({
    template,
    config(data) {
        _u.extend(data, {
            userInfo: {}
        });

        this.supr(data);
    }
});

export default App;